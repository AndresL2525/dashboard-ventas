# Revisión integral del proyecto

Actúa como un **staff/principal engineer** encargado de realizar una **revisión técnica integral** de este proyecto de software.

## Objetivo

Quiero que revises esta carpeta/proyecto completo y me entregues un análisis útil, crítico y accionable sobre su estado actual. El foco principal es identificar fortalezas, riesgos, vacíos y mejoras prioritarias.

## Alcance de la revisión

Analiza todo lo que sea relevante dentro del proyecto, incluyendo por ejemplo:

- Arquitectura general.
- Organización del código.
- Calidad del código.
- Seguridad.
- Integridad y consistencia de datos.
- Manejo de secretos y configuración.
- Dependencias y riesgos de supply chain.
- Validaciones de entrada y manejo de errores.
- Autenticación y autorización, si aplica.
- Consultas a base de datos, migraciones y modelos de datos, si aplica.
- Logging, observabilidad y trazabilidad.
- Pruebas automatizadas y cobertura.
- Rendimiento y posibles cuellos de botella.
- Escalabilidad y mantenibilidad.
- Infraestructura, contenedores, CI/CD o IaC, si existen.
- Cumplimiento de buenas prácticas generales.

## Qué necesito de tu revisión

No quiero solo una descripción superficial del proyecto. Quiero un **feedback tipo auditoría técnica**.

### 1. Entendimiento inicial

Primero explica brevemente:

- qué hace el proyecto,
- cuál parece ser su arquitectura,
- cuáles son sus componentes principales,
- y cuáles son los supuestos que estás haciendo si algo no está claro.

### 2. Hallazgos priorizados

Luego entrega los hallazgos clasificados por prioridad:

- **Crítico**
- **Alto**
- **Medio**
- **Bajo**

Para cada hallazgo incluye:

- **Título**
- **Severidad**
- **Qué encontraste**
- **Por qué importa**
- **Riesgo que introduce**
- **Cómo se podría corregir o mitigar**
- **Evidencia** (archivos, carpetas, funciones, patrones o fragmentos relevantes encontrados en el proyecto)

### 3. Evaluación por dimensiones

Quiero además una evaluación estructurada por estas dimensiones:

- Seguridad
- Integridad de datos
- Calidad de código
- Arquitectura y diseño
- Mantenibilidad
- Testing
- Rendimiento
- DevOps / despliegue
- Observabilidad
- Documentación

Para cada dimensión indica:

- un puntaje de **1 a 10**,
- un diagnóstico breve,
- riesgos principales,
- y mejoras sugeridas.

### 4. Riesgos concretos a buscar

Pon especial atención a detectar si existe algo como:

- Secretos hardcodeados.
- Tokens, API keys o credenciales expuestas.
- Variables de entorno mal gestionadas.
- SQL injection o queries inseguras.
- Falta de validación de inputs.
- Manejo inseguro de archivos.
- Dependencias obsoletas o vulnerables.
- Endpoints inseguros.
- Ausencia de control de acceso.
- Uso incorrecto de criptografía.
- Logs con datos sensibles.
- Falta de migraciones o inconsistencias entre modelos y base de datos.
- Falta de pruebas en partes críticas.
- Código duplicado o acoplamiento excesivo.
- Archivos basura, configuraciones incompletas o deuda técnica evidente.

### 5. Resultado final accionable

Al final quiero:

- Un **resumen ejecutivo** corto.
- Una lista de **quick wins** (mejoras rápidas de alto impacto).
- Una lista de **mejoras estratégicas** (mediano plazo).
- Una lista de **preguntas abiertas o supuestos** que convendría validar con el equipo.

## Cómo quiero la salida

Entrega la respuesta en Markdown, con esta estructura exacta:

# Revisión técnica del proyecto

## 1. Entendimiento del proyecto

## 2. Resumen ejecutivo

## 3. Hallazgos críticos y prioritarios

## 4. Evaluación por dimensiones

## 5. Quick wins

## 6. Mejoras estratégicas

## 7. Preguntas abiertas / supuestos

## 8. Conclusión

## Instrucciones importantes

- No inventes cosas que no encuentres en el proyecto.
- Si algo no se puede confirmar, dilo explícitamente.
- Sé crítico pero útil: no solo señales problemas, también propone soluciones.
- Prioriza hallazgos reales con impacto práctico.
- Si el proyecto tiene varios servicios o carpetas, revisa sus relaciones también.
- Si encuentras algo bien hecho, también menciónalo.
- Si crees que hace falta ejecutar pruebas, revisar dependencias o inspeccionar configuración específica, indícalo.

## Enfoque deseado

Quiero una revisión como la haría alguien senior antes de aprobar este proyecto para producción o antes de heredarlo a otro equipo.
