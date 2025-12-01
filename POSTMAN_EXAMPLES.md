# Postman Examples - Crear Expedientes

## Endpoint
**POST** `http://localhost:3000/expedientes`

## Headers
```
Content-Type: application/json
```

---

## Example 1: Expediente Básico (Solo campos requeridos)

```json
{
  "id_paciente": 1,
  "id_dentista": 1,
  "fecha_consulta": "2024-01-15T10:30:00Z",
  "diagnostico": "Caries en muela 36"
}
```

**Descripción:** Expediente mínimo con solo los campos obligatorios.

---

## Example 2: Expediente Completo (Con todos los campos nuevos)

```json
{
  "id_paciente": 2,
  "id_dentista": 1,
  "fecha_consulta": "2024-01-20T14:00:00Z",
  "diagnostico": "Gingivitis moderada",
  "tratamiento": "Limpieza dental profunda y aplicación de flúor",
  "sintomas": "Sangrado de encías al cepillarse, mal aliento",
  "antecedentes": "Hipertensión controlada, diabetes tipo 2",
  "medicamentos": "Metformina 500mg, Losartán 50mg",
  "alergias": "Penicilina",
  "procedimientos": "Limpieza dental profunda, aplicación tópica de flúor, instrucciones de higiene",
  "costo": 250.00,
  "estado_pago": "pagado",
  "proxima_cita": "2024-02-03T14:00:00Z",
  "observaciones_clinicas": "Encías inflamadas, presencia de placa bacteriana. Mejora notable después de la limpieza.",
  "prescripcion": "Enjuague bucal con clorhexidina 0.12% dos veces al día por 2 semanas",
  "notas": "Paciente requiere seguimiento en 2 semanas. Recomendado uso de enjuague bucal con clorhexidina."
}
```

**Descripción:** Expediente completo con todos los campos disponibles, incluyendo síntomas, antecedentes, medicamentos, alergias, procedimientos, costo, estado de pago, próxima cita, observaciones clínicas y prescripción.

---

## Example 3: Expediente de Ortodoncia (Con campos adicionales)

```json
{
  "id_paciente": 3,
  "id_dentista": 2,
  "fecha_consulta": "2024-01-25T09:15:00Z",
  "diagnostico": "Maloclusión clase II, apiñamiento dental",
  "tratamiento": "Colocación de brackets metálicos en arcada superior e inferior",
  "sintomas": "Dificultad al masticar, dolor en la mandíbula, apiñamiento visible",
  "antecedentes": "Sin antecedentes médicos relevantes",
  "medicamentos": "Ninguno",
  "alergias": "Ninguna conocida",
  "procedimientos": "Colocación de brackets metálicos, aplicación de arcos iniciales, instrucciones de higiene con brackets",
  "costo": 3500.00,
  "estado_pago": "parcial",
  "proxima_cita": "2024-02-22T09:15:00Z",
  "observaciones_clinicas": "Paciente joven, buena colaboración. Se colocaron brackets en ambas arcadas. Se explicó la importancia de la higiene durante el tratamiento.",
  "prescripcion": "Cera para brackets si hay molestias, analgésico si es necesario (Ibuprofeno 400mg)",
  "notas": "Primera consulta de ortodoncia. Paciente informado sobre duración estimada del tratamiento (18-24 meses). Próxima cita programada para ajuste en 4 semanas."
}
```

**Descripción:** Expediente detallado para un caso de ortodoncia con todos los campos disponibles.

---

## Notas Importantes:

1. **id_paciente** y **id_dentista**: Deben ser números que existan en las tablas de pacientes y dentistas respectivamente.

2. **fecha_consulta**: Formato ISO 8601 (ejemplo: `2024-01-15T10:30:00Z`). También puedes usar:
   - `2024-01-15T10:30:00` (sin Z)
   - `2024-01-15 10:30:00`

3. **diagnostico**: Campo requerido, debe ser un string no vacío.

4. **Campos opcionales**: Todos los demás campos son opcionales y pueden omitirse o enviarse como `null`:
   - `tratamiento`: Tratamiento aplicado
   - `sintomas`: Síntomas del paciente
   - `antecedentes`: Antecedentes médicos
   - `medicamentos`: Medicamentos actuales
   - `alergias`: Alergias conocidas
   - `procedimientos`: Procedimientos realizados
   - `costo`: Número (costo del tratamiento)
   - `estado_pago`: String con valores: `'pendiente'`, `'pagado'`, `'parcial'`
   - `proxima_cita`: Fecha en formato ISO 8601
   - `observaciones_clinicas`: Observaciones clínicas
   - `prescripcion`: Prescripción médica
   - `notas`: Notas adicionales

5. **Respuesta exitosa (201 Created)**:
```json
{
  "id": "507f1f77bcf86cd799439011",
  "id_expediente": "507f1f77bcf86cd799439011",
  "id_paciente": 1,
  "id_dentista": 1,
  "fecha_consulta": "2024-01-15T10:30:00.000Z",
  "diagnostico": "Caries en muela 36",
  "tratamiento": null,
  "sintomas": null,
  "antecedentes": null,
  "medicamentos": null,
  "alergias": null,
  "procedimientos": null,
  "costo": null,
  "estado_pago": null,
  "proxima_cita": null,
  "observaciones_clinicas": null,
  "prescripcion": null,
  "notas": null,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

---

# Postman Examples - Crear Dentistas

## Endpoint
**POST** `http://localhost:3000/dentistas`

## Headers
```
Content-Type: application/json
```

---

## Example 1: Dentista Básico (Solo campos requeridos)

```json
{
  "nombre": "Dr. Carlos Mendoza",
  "correo": "carlos.mendoza@clinicadental.com"
}
```

**Descripción:** Dentista mínimo con solo los campos obligatorios (nombre y correo).

---

## Example 2: Dentista Completo (Con todos los campos)

```json
{
  "nombre": "Dra. Ana García López",
  "telefono": "+52 55 1234 5678",
  "correo": "ana.garcia@clinicadental.com",
  "especialidad": "Ortodoncia"
}
```

**Descripción:** Dentista completo con todos los campos disponibles, incluyendo teléfono y especialidad.

---

## Example 3: Dentista Especialista en Endodoncia

```json
{
  "nombre": "Dr. Roberto Martínez Sánchez",
  "telefono": "+52 55 9876 5432",
  "correo": "roberto.martinez@clinicadental.com",
  "especialidad": "Endodoncia"
}
```

**Descripción:** Dentista especialista en endodoncia con información completa de contacto.

---

## Notas Importantes:

1. **nombre**: Campo requerido, debe ser un string no vacío.

2. **correo**: Campo requerido, debe ser un string no vacío y único (no puede estar duplicado en la base de datos).

3. **telefono**: Campo opcional, puede omitirse o enviarse como `null`.

4. **especialidad**: Campo opcional, puede omitirse o enviarse como `null`. Ejemplos comunes:
   - `"Ortodoncia"`
   - `"Endodoncia"`
   - `"Periodoncia"`
   - `"Implantología"`
   - `"Odontopediatría"`
   - `"Cirugía Oral"`

5. **Respuesta exitosa (201 Created)**:
```json
{
  "id_dentista": 1,
  "nombre": "Dr. Carlos Mendoza",
  "telefono": null,
  "correo": "carlos.mendoza@clinicadental.com",
  "especialidad": null
}
```

6. **Error si el correo ya existe (400 Bad Request)**:
```json
{
  "error": "El correo ya está registrado."
}
```

