const Dentista = require('./Dentista');
const Paciente = require('./Paciente');
const Cita = require('./Cita');


Cita.belongsTo(Dentista, { 
    foreignKey: 'id_dentista',
    as: 'dentista'
});

Dentista.hasMany(Cita, { 
    foreignKey: 'id_dentista',
    as: 'citas'
});


Cita.belongsTo(Paciente, { 
    foreignKey: 'id_paciente',
    as: 'paciente'
});

Paciente.hasMany(Cita, { 
    foreignKey: 'id_paciente',
    as: 'citas'
});

module.exports = {
    Dentista,
    Paciente,
    Cita
};
