import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { marked } from 'marked';
import { map, shareReplay, switchMap, Observable, of } from 'rxjs';

export interface ContentItem {
  slug: string;
  title: string;
  excerpt: string;
  date?: string;
  content?: string;
  html?: string;
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);

  // true by default — content is discovered dynamically via index.json
  readonly hasPosts = signal(true);
  readonly hasProjects = signal(true);

  private projects$?: Observable<ContentItem[]>;
  private posts$?: Observable<ContentItem[]>;

  getPosts(): Observable<ContentItem[]> {
    this.posts$ ??= this.loadSection('content/posts').pipe(shareReplay(1));
    return this.posts$;
  }

  getProjects(): Observable<ContentItem[]> {
    this.projects$ ??= this.loadSection('content/projects').pipe(shareReplay(1));
    return this.projects$;
  }

  getPostBySlug(slug: string): Observable<ContentItem | undefined> {
    return this.getPosts().pipe(map(items => items.find(item => item.slug === slug)));
  }

  getProjectBySlug(slug: string): Observable<ContentItem | undefined> {
    return this.getProjects().pipe(map(items => items.find(item => item.slug === slug)));
  }

  private loadSection(path: string): Observable<ContentItem[]> {
    return this.http.get<string[]>(`${path}/index.json`).pipe(
      switchMap(fileNames =>
        fileNames.length === 0
          ? of([])
          : this.loadContentItems(path, fileNames)
      )
    );
  }

  private loadContentItems(path: string, fileNames: string[]): Observable<ContentItem[]> {
    return new Observable(observer => {
      const items: ContentItem[] = [];
      let loaded = 0;

      fileNames.forEach(fileName => {
        this.http.get(`${path}/${fileName}`, { responseType: 'text' })
          .subscribe({
            next: content => {
              items.push(this.parseMarkdown(content));
              loaded++;
              if (loaded === fileNames.length) {
                observer.next(this.sortItemsByDate(items));
                observer.complete();
              }
            },
            error: () => {
              loaded++;
              if (loaded === fileNames.length) {
                observer.next(this.sortItemsByDate(items));
                observer.complete();
              }
            }
          });
      });
    });
  }

  private sortItemsByDate(items: ContentItem[]): ContentItem[] {
    return [...items].sort((a, b) => {
      const at = a.date ? new Date(a.date).getTime() : 0;
      const bt = b.date ? new Date(b.date).getTime() : 0;
      return bt - at;
    });
  }

  private parseMarkdown(markdown: string): ContentItem {
    const lines = markdown.split('\n');
    const metadata: Record<string, string> = {};
    let contentStart = 0;

    if (lines[0]?.trim() === '---') {
      let i = 1;
      while (i < lines.length && lines[i]?.trim() !== '---') {
        const sep = lines[i].indexOf(':');
        if (sep > -1) {
          const key = lines[i].slice(0, sep).trim();
          const value = lines[i].slice(sep + 1).trim();
          if (key && value) metadata[key] = value;
        }
        i++;
      }
      contentStart = i + 1;
    }

    const content = lines.slice(contentStart).join('\n');
    return {
      slug: metadata['slug'] || 'untitled',
      title: metadata['title'] || 'Untitled',
      excerpt: metadata['excerpt'] || content.substring(0, 150),
      date: metadata['date'],
      content,
      html: marked(content) as string
    };
  }
}
