export const MESSAGES = {
STUDENT:
{
GET: {
    SUCCES: 'Se cargo la lista de alumnos correctamente',
    ERROR: 'Se produjo un error al intentar obtener los alumnos',
    NORMAL: 'Recarga exitosa. No se encontraron nuevas entradas'
},
POST: {
    SUCCES: 'Se agrego el alumno correctamente.',
    ERROR: {
        400: 'El alumno ya existe en la base de datos'
    },
    NORMAL: 'Sin cambios en el agregado de alumnos'
},
PUT: {
}
},

PARENT:
{
    SUCCES: 'Se agrego un familiar',
    ERROR: 'No se pueden agregar mas familiares',
    NORMAL: 'Se quito el familiar adicional'
},
CLEAR_FORMS: 'Se limpiaron los formularios'


};
