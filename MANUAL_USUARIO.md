# Manual de Usuario - CRM Dentista

> 📖 **Volver al índice**: [README.md](./README.md) | [Documentación completa](./README.md#-documentación-del-proyecto)

## 📋 Índice

1. [Introducción](#introducción)
2. [Acceso al Sistema](#acceso-al-sistema)
3. [Navegación](#navegación)
4. [Gestión de Pacientes](#gestión-de-pacientes)
5. [Gestión de Citas](#gestión-de-citas)
6. [Gestión de Expedientes Médicos](#gestión-de-expedientes-médicos)
7. [Flujos de Trabajo Comunes](#flujos-de-trabajo-comunes)
8. [Solución de Problemas](#solución-de-problemas)
9. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## Introducción

### ¿Qué es CRM Dentista?

CRM Dentista es un sistema de gestión para consultorios dentales que permite:

- **Gestionar pacientes**: Registrar y mantener información de pacientes
- **Agendar citas**: Programar y administrar citas con dentistas
- **Expedientes médicos**: Crear y mantener expedientes médicos completos de los pacientes

### ¿Quién puede usar este sistema?

- Dentistas
- Recepcionistas
- Personal administrativo del consultorio

---

## Acceso al Sistema

### Requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet
- URL del sistema proporcionada por el administrador

### Iniciar Sesión

1. Abra su navegador web
2. Ingrese la URL del sistema (ejemplo: `https://dentist-crm-frontend.onrender.com`)
3. El sistema se cargará automáticamente

**Nota**: Actualmente el sistema no requiere autenticación. Esto puede cambiar en futuras versiones.

---

## Navegación

### Barra de Navegación

En la parte superior de la pantalla encontrará la barra de navegación con tres opciones principales:

- **👥 Pacientes**: Gestionar información de pacientes
- **📅 Nueva cita**: Crear una nueva cita
- **📋 Expedientes**: Ver y gestionar expedientes médicos

### Cómo Navegar

1. Haga clic en cualquiera de los botones de la barra de navegación
2. La página correspondiente se cargará automáticamente
3. Puede cambiar entre secciones en cualquier momento

---

## Gestión de Pacientes

### Ver Lista de Pacientes

1. Haga clic en **👥 Pacientes** en la barra de navegación
2. Se mostrará una lista de todos los pacientes registrados
3. Para cada paciente verá:
   - Nombre completo
   - Teléfono
   - Correo electrónico

### Crear un Nuevo Paciente

1. Vaya a la sección **👥 Pacientes**
2. Encontrará un formulario titulado **"Agregar paciente"**
3. Complete los siguientes campos:

   **Campos Requeridos:**
   - **Nombre**: Nombre completo del paciente
   - **Teléfono**: Número de teléfono de contacto
   - **Correo electrónico**: Correo del paciente (debe ser único)

   **Campos Opcionales:**
   - **Fecha de nacimiento**: Fecha de nacimiento del paciente

4. Haga clic en el botón **"Crear"**
5. El paciente se agregará a la lista y el formulario se limpiará

**⚠️ Importante:**
- El correo electrónico debe ser único. Si intenta crear un paciente con un correo que ya existe, recibirá un error.
- No puede haber dos pacientes con el mismo correo electrónico.

### Editar un Paciente

1. Vaya a la sección **👥 Pacientes**
2. En la lista de pacientes, localice el paciente que desea editar
3. Haga clic en el botón **"Editar"** junto al paciente
4. El formulario se llenará automáticamente con los datos del paciente
5. Modifique los campos que desee cambiar
6. Haga clic en el botón **"Modificar"**
7. Los cambios se guardarán y el paciente se actualizará en la lista

**Para cancelar la edición:**
- Haga clic en el botón **"Cancelar"** para descartar los cambios

### Eliminar un Paciente

1. Vaya a la sección **👥 Pacientes**
2. En la lista de pacientes, localice el paciente que desea eliminar
3. Haga clic en el botón **"Eliminar"** junto al paciente
4. Aparecerá un mensaje de confirmación: *"¿Está seguro de que desea eliminar este paciente?"*
5. Haga clic en **"Aceptar"** para confirmar o **"Cancelar"** para abortar

**⚠️ Importante:**
- Solo puede eliminar pacientes que no tengan citas activas (futuras)
- Si el paciente tiene citas programadas, recibirá un error y no podrá eliminarlo

---

## Gestión de Citas

### Crear una Nueva Cita

1. Haga clic en **📅 Nueva cita** en la barra de navegación
2. Se mostrará un formulario para crear la cita
3. Complete los siguientes campos (todos son requeridos):

   - **Paciente**: Seleccione el paciente de la lista desplegable
   - **Dentista**: Seleccione el dentista de la lista desplegable
   - **Fecha y hora**: Seleccione la fecha y hora de la cita
   - **Motivo**: Escriba el motivo de la consulta

4. Haga clic en el botón **"Crear la cita"**
5. Si la cita se crea exitosamente, verá un mensaje: *"¡Cita creada con éxito!"*
6. El formulario se limpiará automáticamente

**⚠️ Restricciones:**
- Un dentista no puede tener dos citas a la misma hora
- Un paciente no puede tener dos citas a la misma hora
- Si intenta crear una cita con un horario ocupado, recibirá un error

**Ejemplo de Motivo:**
- "Limpieza dental de rutina"
- "Dolor en muela"
- "Consulta de ortodoncia"
- "Revisión post-tratamiento"

---

## Gestión de Expedientes Médicos

### ¿Qué es un Expediente Médico?

Un expediente médico es el historial completo de un paciente con un dentista específico. Contiene:
- Información de consultas
- Diagnósticos
- Tratamientos aplicados
- Historial médico
- Prescripciones

**⚠️ Importante:**
- Un paciente solo puede tener **UN expediente por dentista**
- Si intenta crear un segundo expediente para el mismo paciente-dentista, recibirá un error
- Para agregar información de nuevas consultas, debe **actualizar** el expediente existente

### Ver Lista de Expedientes

1. Haga clic en **📋 Expedientes** en la barra de navegación
2. Se mostrará una lista de todos los expedientes médicos
3. Para cada expediente verá:
   - Nombre del paciente
   - Fecha de consulta
   - Diagnóstico
   - Síntomas (si están registrados)
   - Tratamiento (si está registrado)
   - Procedimientos (si están registrados)
   - Información adicional según lo que se haya ingresado

### Crear un Nuevo Expediente

1. Vaya a la sección **📋 Expedientes**
2. Encontrará un formulario titulado **"Agregar expediente"**
3. Complete los campos:

   **Campos Requeridos:**
   - **Paciente**: Seleccione el paciente de la lista desplegable
   - **Dentista**: Seleccione el dentista de la lista desplegable
   - **Fecha y hora de consulta**: Seleccione la fecha y hora
   - **Diagnóstico**: Escriba el diagnóstico del paciente

   **Campos Opcionales:**
   - **Síntomas**: Síntomas que presenta el paciente
   - **Antecedentes médicos**: Antecedentes relevantes
   - **Medicamentos**: Medicamentos que está tomando
   - **Alergias**: Alergias conocidas
   - **Tratamiento**: Tratamiento aplicado o recomendado
   - **Procedimientos realizados**: Procedimientos realizados durante la consulta
   - **Próxima cita**: Fecha programada para la próxima consulta
   - **Observaciones clínicas**: Observaciones adicionales
   - **Prescripción**: Prescripción médica o receta
   - **Notas adicionales**: Notas sobre la consulta

4. Haga clic en el botón **"Crear"**
5. El expediente se agregará a la lista

**⚠️ Error Común:**
Si intenta crear un expediente para un paciente-dentista que ya tiene uno, verá el error:
*"Ya existe un expediente para este paciente y dentista. Use la función de actualización para modificar el expediente existente."*

**Solución**: Use la función de edición para actualizar el expediente existente.

### Editar un Expediente

1. Vaya a la sección **📋 Expedientes**
2. En la lista de expedientes, localice el que desea editar
3. Haga clic en el botón **"Editar"** junto al expediente
4. El formulario se llenará automáticamente con los datos del expediente
5. Modifique los campos que desee cambiar o agregue nueva información
6. Haga clic en el botón **"Modificar"**
7. Los cambios se guardarán y el expediente se actualizará en la lista

**Uso Típico:**
- Agregar información de una nueva consulta al expediente existente
- Actualizar el diagnóstico después de una revisión
- Agregar procedimientos realizados
- Actualizar la fecha de próxima cita

### Eliminar un Expediente

1. Vaya a la sección **📋 Expedientes**
2. En la lista de expedientes, localice el que desea eliminar
3. Haga clic en el botón **"Eliminar"** junto al expediente
4. Aparecerá un mensaje de confirmación: *"¿Está seguro de que desea eliminar este expediente?"*
5. Haga clic en **"Aceptar"** para confirmar o **"Cancelar"** para abortar

**⚠️ Advertencia:**
- Esta acción no se puede deshacer
- Se perderá toda la información del expediente

---

## Flujos de Trabajo Comunes

### Flujo 1: Registrar un Nuevo Paciente y Agendar su Primera Cita

1. **Crear el paciente:**
   - Vaya a **👥 Pacientes**
   - Complete el formulario con los datos del paciente
   - Haga clic en **"Crear"**

2. **Agendar la cita:**
   - Vaya a **📅 Nueva cita**
   - Seleccione el paciente recién creado
   - Seleccione el dentista
   - Elija fecha, hora y motivo
   - Haga clic en **"Crear la cita"**

3. **Crear el expediente (después de la consulta):**
   - Vaya a **📋 Expedientes**
   - Complete el formulario con la información de la consulta
   - Haga clic en **"Crear"**

### Flujo 2: Agregar Información de una Nueva Consulta a un Expediente Existente

1. Vaya a **📋 Expedientes**
2. Localice el expediente del paciente
3. Haga clic en **"Editar"**
4. Actualice los campos:
   - Cambie la **Fecha y hora de consulta** a la nueva fecha
   - Actualice el **Diagnóstico** si es necesario
   - Agregue información en **Síntomas**, **Tratamiento**, **Procedimientos**, etc.
5. Haga clic en **"Modificar"**

### Flujo 3: Reprogramar una Cita

**Nota**: Actualmente el sistema no tiene una interfaz visual para reprogramar citas. Esta funcionalidad está disponible a través de la API. En futuras versiones se agregará esta opción en la interfaz.

### Flujo 4: Consultar el Historial de un Paciente

1. Vaya a **📋 Expedientes**
2. Busque en la lista los expedientes que correspondan al paciente
3. Puede ver toda la información médica del paciente con cada dentista

---

## Solución de Problemas

### Problema: "Error al cargar los pacientes"

**Posibles causas:**
- El servidor no está funcionando
- Problemas de conexión a internet
- Error en la base de datos

**Soluciones:**
1. Verifique su conexión a internet
2. Recargue la página (F5 o Ctrl+R)
3. Si el problema persiste, contacte al administrador del sistema

### Problema: "El correo ya está registrado"

**Causa:** Está intentando crear un paciente con un correo electrónico que ya existe en el sistema.

**Solución:**
- Use un correo electrónico diferente
- O edite el paciente existente con ese correo

### Problema: "El dentista ya tiene una cita en ese horario"

**Causa:** Está intentando agendar una cita en un horario que ya está ocupado.

**Solución:**
- Elija otro horario disponible
- Verifique las citas existentes del dentista

### Problema: "Ya existe un expediente para este paciente y dentista"

**Causa:** Está intentando crear un segundo expediente para un paciente-dentista que ya tiene uno.

**Solución:**
- En lugar de crear uno nuevo, edite el expediente existente
- Haga clic en **"Editar"** en el expediente existente
- Actualice la información con los datos de la nueva consulta

### Problema: "No se puede eliminar: el paciente tiene citas activas"

**Causa:** El paciente tiene citas programadas en el futuro.

**Solución:**
- Primero cancele o elimine las citas futuras del paciente
- Luego podrá eliminar el paciente

### Problema: La página no carga o se ve mal

**Soluciones:**
1. Recargue la página (F5)
2. Limpie la caché del navegador
3. Pruebe con otro navegador
4. Verifique que tenga conexión a internet

---

## Preguntas Frecuentes

### ¿Puedo tener dos pacientes con el mismo nombre?

**Sí.** El sistema permite que varios pacientes tengan el mismo nombre. Lo que debe ser único es el correo electrónico.

### ¿Puedo agendar dos citas a la misma hora?

**No.** El sistema previene que:
- Un dentista tenga dos citas a la misma hora
- Un paciente tenga dos citas a la misma hora

### ¿Un paciente puede tener múltiples expedientes?

**Sí, pero con restricciones:**
- Un paciente puede tener un expediente con cada dentista diferente
- Un paciente solo puede tener UN expediente por dentista
- Si necesita agregar información de nuevas consultas, debe actualizar el expediente existente

**Ejemplo:**
- Paciente A puede tener expediente con Dentista 1 ✅
- Paciente A puede tener expediente con Dentista 2 ✅
- Paciente A NO puede tener dos expedientes con Dentista 1 ❌

### ¿Cómo agrego información de una nueva consulta al expediente?

1. Vaya a **📋 Expedientes**
2. Busque el expediente del paciente
3. Haga clic en **"Editar"**
4. Actualice la información:
   - Cambie la fecha de consulta
   - Actualice diagnóstico, síntomas, tratamiento, etc.
5. Haga clic en **"Modificar"**

### ¿Puedo eliminar un paciente que tiene citas?

**Solo si no tiene citas futuras.** Si el paciente tiene citas programadas, primero debe cancelarlas o eliminarlas.

### ¿Los datos se guardan automáticamente?

**No.** Debe hacer clic en los botones **"Crear"**, **"Modificar"** o **"Crear la cita"** para guardar los datos. Si cierra la página sin guardar, se perderán los cambios.

### ¿Puedo deshacer una eliminación?

**No.** Las eliminaciones son permanentes. Asegúrese de estar seguro antes de eliminar cualquier registro.

### ¿Cómo sé si una operación fue exitosa?

- **Crear/Modificar exitoso**: El formulario se limpiará o se actualizará la lista
- **Crear cita exitoso**: Verá el mensaje "¡Cita creada con éxito!"
- **Error**: Verá un mensaje de error en rojo explicando el problema

---

## Consejos y Mejores Prácticas

### Para Recepcionistas

1. **Siempre verifique la disponibilidad** antes de agendar una cita
2. **Registre información completa** de los pacientes al crearlos
3. **Use correos electrónicos únicos** para cada paciente
4. **Confirme los datos** antes de guardar

### Para Dentistas

1. **Actualice los expedientes** después de cada consulta
2. **Sea específico en los diagnósticos** para facilitar el seguimiento
3. **Registre todas las alergias** conocidas del paciente
4. **Programe la próxima cita** en el expediente cuando sea necesario

### Para Administradores

1. **Mantenga la información actualizada**
2. **Revise regularmente** los expedientes para completar información faltante
3. **Elimine solo cuando sea necesario** (los datos eliminados no se pueden recuperar)

---

## Glosario

- **Paciente**: Persona que recibe servicios dentales
- **Dentista**: Profesional que brinda servicios dentales
- **Cita**: Consulta programada entre un paciente y un dentista
- **Expediente Médico**: Historial médico completo de un paciente con un dentista específico
- **Diagnóstico**: Evaluación médica de la condición del paciente
- **Tratamiento**: Procedimiento o terapia aplicada al paciente

---

## Soporte

Si tiene problemas o preguntas que no están cubiertas en este manual:

1. Revise la sección de **Solución de Problemas**
2. Consulte las **Preguntas Frecuentes**
3. Contacte al administrador del sistema o al equipo de soporte técnico

---

**Última actualización:** 2025-01-15  
**Versión del sistema:** 1.0.0

