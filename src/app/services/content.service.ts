import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { marked } from 'marked';
import { map, shareReplay, Observable } from 'rxjs';

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

  private readonly postFileNames = ['example-1.md', 'example-2.md'];
  private readonly projectFileNames = ['example-1.md', 'example-2.md'];

  private readonly aboutHtml$ = this.http
    .get('content/about.md', { responseType: 'text' })
    .pipe(
      map(md => marked.parse(md) as string),
      shareReplay(1)
    );

  getAboutHtml(): Observable<string> {
    return this.aboutHtml$;
  }

  getPosts(): Observable<ContentItem[]> {
    return this.loadContentItems('content/posts', this.postFileNames).pipe(shareReplay(1));
  }

  getProjects(): Observable<ContentItem[]> {
    return this.loadContentItems('content/projects', this.projectFileNames).pipe(shareReplay(1));
  }

  getPostBySlug(slug: string): Observable<ContentItem | undefined> {
    return this.getPosts().pipe(map(items => items.find(item => item.slug === slug)));
  }

  getProjectBySlug(slug: string): Observable<ContentItem | undefined> {
    return this.getProjects().pipe(map(items => items.find(item => item.slug === slug)));
  }

  private loadContentItems(path: string, fileNames: string[]): Observable<ContentItem[]> {
    return new Observable(observer => {
      const items: ContentItem[] = [];
      let loaded = 0;

      fileNames.forEach(fileName => {
        this.http.get(`${path}/${fileName}`, { responseType: 'text' })
          .subscribe({
            next: (content) => {
              const item = this.parseMarkdown(content);
              items.push(item);
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
    return [...items].sort((left, right) => {
      const leftTime = left.date ? new Date(left.date).getTime() : 0;
      const rightTime = right.date ? new Date(right.date).getTime() : 0;
      return rightTime - leftTime;
    });
  }

  private parseMarkdown(markdown: string): ContentItem {
    const lines = markdown.split('\n');
    const metadata: Record<string, string> = {};
    let contentStart = 0;

    if (lines[0]?.trim() === '---') {
      let i = 1;
      while (i < lines.length && lines[i]?.trim() !== '---') {
        const separatorIndex = lines[i].indexOf(':');
        if (separatorIndex > -1) {
          const key = lines[i].slice(0, separatorIndex).trim();
          const value = lines[i].slice(separatorIndex + 1).trim();
          if (key && value) {
            metadata[key] = value;
          }
        }
        i++;
      }
      contentStart = i + 1;
    }

    const content = lines.slice(contentStart).join('\n');
    const html = marked(content);

    return {
      slug: metadata['slug'] || 'untitled',
      title: metadata['title'] || 'Untitled',
      excerpt: metadata['excerpt'] || content.substring(0, 150),
      date: metadata['date'],
      content,
      html: html as string
    };
  }
}
