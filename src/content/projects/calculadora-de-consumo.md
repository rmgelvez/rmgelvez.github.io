---
slug: calculadora-de-consumo
title: Calculadora de Consumo Eléctrico
excerpt: Herramienta interactiva para aprender sobre consumo eléctrico del hogar. Enciende aparatos, ajusta horas de uso y descubre cómo se calcula tu factura — ¡y qué pasa cuando sobrecargas el breaker!
date: 2026-07-25
---

> Proyecto asesorado para la **Feria de la Creatividad**, desarrollado por **Carlos Alberto Villamizar Ruiz**, estudiante de 13 años.

## ¿Qué es este proyecto?

La **Calculadora de Consumo Eléctrico** es una herramienta interactiva pensada para que estudiantes jóvenes aprendan de forma visual y práctica cómo los aparatos del hogar consumen energía, cómo se calcula la factura mensual y qué ocurre cuando se sobrecarga la red eléctrica doméstica.

---

## ¿Cómo funciona?

La calculadora presenta 12 aparatos electrónicos comunes del hogar. Para cada uno puedes:

- **Encender o apagar** el aparato mediante un interruptor (toggle).
- **Ajustar la cantidad** de unidades en uso (de 1 a 10).
- **Seleccionar las horas de uso diario** con un slider (de 0.5 h a 24 h).

Con esos datos, la herramienta calcula en tiempo real:

### Consumo mensual en kWh

```
kWh/mes = (Watts × Cantidad × Horas/día × 30 días) ÷ 1000
```

### Factura estimada en pesos colombianos

Usando una tarifa promedio de **900 COP por kWh** (referencia para Colombia):

```
Factura = kWh/mes × 900 COP
```

### Potencia instantánea

La suma de vatios de todos los aparatos encendidos en simultáneo:

```
Potencia (W) = Σ (Watts × Cantidad) para cada aparato encendido
```

---

## Mecánica del breaker

La vivienda tiene un **límite seguro de 1.500 W** (equivalente a un circuito típico de 15 A a 120 V en Colombia). Si la potencia total supera ese límite:

1. Se activa una **alerta en pantalla completa** con animación de vibración y parpadeo.
2. Se muestra la potencia actual vs. el límite.
3. El botón **"Reiniciar el Breaker"** apaga todos los aparatos y restablece el sistema.

Esto simula de forma educativa lo que ocurre en la vida real cuando se sobrecarga un circuito: el breaker se dispara y se pierde el fluido eléctrico en ese circuito.

---

## Aparatos disponibles

| Aparato | Consumo |
|---|---|
| Bombillo LED | 10 W |
| Ventilador | 75 W |
| Televisor | 100 W |
| Computador | 65 W |
| Cargador Celular | 10 W |
| Nevera | 400 W |
| Microondas | 1.200 W |
| Lavadora | 500 W |
| Plancha de Ropa | 1.000 W |
| Aire Acondicionado | 1.500 W |
| Ducha Eléctrica | 3.500 W |
| Licuadora | 300 W |

---

## Tecnologías utilizadas

Este proyecto está construido completamente en **HTML, CSS y JavaScript vanilla** — sin frameworks ni dependencias externas. Se integra al portafolio Angular a través de un `<iframe>`, lo que permite que también funcione como página independiente.

- `index.html` — estructura de la interfaz
- `styles.css` — diseño con variables CSS para dark theme
- `app.js` — lógica completa: renderizado dinámico, cálculos en tiempo real, mecánica del breaker
- `svg/` — íconos vectoriales para cada aparato

---

## Probar la calculadora

[→ Abrir Calculadora de Consumo Eléctrico](/#/lab/calculadora-de-consumo)
