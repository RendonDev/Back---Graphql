const { authenticated } = require('../autenticacion/utils')
const { conexion } = require('./conexion')
const { GraphQLObjectType,GraphQLNonNull, GraphQLList , GraphQLInt, GraphQLString, Graphql} = require("graphql")
const { AudAcuInputType, ContratoInputType, ObservacionInputType, TurnarDInputType, SolicitudInputType } = require('./types')

const mutation = new GraphQLObjectType({
    name: "Mutation",    
    type: "Mutation",
    fields: () => ({
        //este es para ingresar datos a turnar_director
        insert_turnar_director: {
            type: TurnarDInputType,
            args: {
                id_expediente: { type: GraphQLString },
                instruccion: { type: GraphQLString },
                fecha_turno: { type: GraphQLString }, //timestamp
                desc_director: { type: GraphQLString },            
                usuario: { type: GraphQLString },
                fecha_alta: { type: GraphQLString },		//timestamp
                fecha_modificacion: { type: GraphQLString },	//timestamp
                estatus: { type: GraphQLString }			
            },
            resolve: authenticated ((parentValue, args, context) =>{
                return conexion().then(db => db.collection('turnar_director').insertOne({ 
                    id_expediente: args.id_expediente,
                    instruccion: args.instruccion,
                    fecha_turno: args.fecha_turno, //timestamp
                    desc_director: args.desc_director,
                    usuario: args.usuario,
                    fecha_alta: args.fecha_alta,		//timestamp
                    fecha_modificacion: args.fecha_modificacion,	//timestamp
                    estatus: args.estatus
                })).then(response => response.ops[0])
            })
        },
        // este es para actualizar datos a turnar_director
        act_turnar_director: {
            type: TurnarDInputType,
            args: {
                id_expediente: { type: GraphQLString },
                instruccion: { type: GraphQLString },
                fecha_turno: { type: GraphQLString }, //timestamp
                desc_director: { type: GraphQLString },
                usuario: { type: GraphQLString },
                fecha_alta: { type: GraphQLString },		//timestamp
                fecha_modificacion: { type: GraphQLString },	//timestamp
            },
            resolve: authenticated ((parentValue, args, context) =>  {
                 return conexion().then(db => db.collection('turnar_director').findOneAndUpdate({
                    id_expediente: args.id_expediente},
                    { $set:{
                        instruccion: args.instruccion,
                        fecha_turno: args.fecha_turno, //timestamp
                        desc_director: args.desc_director,
                        usuario: args.usuario,
                        fecha_alta: args.fecha_alta,		//timestamp
                        fecha_modificacion: args.fecha_modificacion	//timestamp                        	  
                    }}, { new: true }))
            })
        },
        // este es para borrar datos a turnar_director
        del_turnar_director: {
            type: TurnarDInputType,
            args: {
                id_expediente: { type: GraphQLString },
                estatus: { type: GraphQLString }        
            },
            resolve: authenticated ((parentValue, args, context) => {
                return conexion().then(db => db.collection('turnar_director').findOneAndUpdate({
                    id_expediente: args.id_expediente},
                    { $set:{
                        estatus: "I"                      	  
                    }}, { new: true }))
            })
        },
        // este es para insertar datos a Contrato
        insert_contrato: {
            type: ContratoInputType,
            args:{
                    desc_contrato: { type: GraphQLString },
                    id_expediente: { type: GraphQLString },
                    numero_contrato: { type: GraphQLString },
                    objeto_contrato: { type: GraphQLString },
                    desc_ley: { type: GraphQLString },
                    desc_materia: { type: GraphQLString },
                    desc_tipo: { type: GraphQLString }, 
                    monto_contrato: { type: GraphQLString },
                    monto_reclamacion: { type: GraphQLString },
                    desc_moneda: { type: GraphQLString },
                    modificatorio: { type: GraphQLString },
                    vigencia: { type: GraphQLString },
                    monto: { type: GraphQLString },
                    usuario: { type: GraphQLString },
                    fecha_alta: { type: GraphQLString },
                    fecha_modificacion: { type: GraphQLString },
                    estatus: { type: GraphQLString }
            },
            resolve: authenticated ((parentValue, args, context) => {
                return conexion().then(db => db.collection('contrato').insertOne({ 
                    desc_contrato: args.desc_contrato,
                    id_expediente: args.id_expediente,
                    numero_contrato: args.numero_contrato,
                    objeto_contrato: args.objeto_contrato,
                    desc_ley: args.desc_ley,
                    desc_materia: args.desc_materia,
                    desc_tipo: args.desc_tipo,
                    monto_contrato: args.monto_contrato,
                    monto_reclamacion: args.monto_reclamacion,
                    desc_moneda: args.desc_moneda,
                    modificatorio: args.modificatorio,
                    vigencia: args.vigencia,
                    monto: args.monto,
                    usuario: args.usuario,
                    fecha_alta: args.fecha_alta,
                    fecha_modificacion: args.fecha_modificacion,
                    estatus: args.estatus 
                })).then(response => response.ops[0])
            })
        },
        // este mutation es para actualizar datos a Contrato
        act_contrato: {
            type: ContratoInputType,
            args: {
                desc_contrato: { type: GraphQLInt },
                id_expediente: { type: GraphQLString },
                numero_contrato: { type: GraphQLString },
                objeto_contrato: { type: GraphQLString },
                desc_ley: { type: GraphQLInt },
                desc_materia: { type: GraphQLInt },
                desc_tipo: { type: GraphQLInt }, 
                monto_contrato: { type: GraphQLString },
                monto_reclamacion: { type: GraphQLString },
                desc_moneda: { type: GraphQLInt },
                modificatorio: { type: GraphQLInt },
                vigencia: { type: GraphQLString },
                monto: { type: GraphQLString },
                usuario: { type: GraphQLString },
                fecha_alta: { type: GraphQLString },
                fecha_modificacion: { type: GraphQLString },
                estatus: { type: GraphQLString }
             },
            resolve: authenticated ((parentValue, args, context) => {
                return conexion().then(db => db.collection('contrato').findOneAndUpdate({id_expediente: args.id_expediente},
                    { $set:{
                        desc_contrato: args.desc_contrato.GraphQLNonNull,
                        numero_contrato: args.numero_contrato.GraphQLNonNull,
                        objeto_contrato: args.objeto_contrato.GraphQLNonNull,
                        desc_ley: args.desc_ley.GraphQLNonNull,
                        desc_materia: args.desc_materia.GraphQLNonNull,
                        desc_tipo: args.desc_tipo.GraphQLNonNull,
                        monto_contrato: args.monto_contrato.GraphQLNonNull,
                        monto_reclamacion: args.monto_reclamacion.GraphQLNonNull,
                        desc_moneda: args.desc_moneda.GraphQLNonNull,
                        modificatorio: args.modificatorio.GraphQLNonNull,
                        vigencia: args.vigencia.GraphQLNonNull,
                        monto: args.monto.GraphQLNonNull,
                        usuario: args.usuario.GraphQLNonNull,
                        fecha_alta: args.fecha_alta.GraphQLNonNull,
                        fecha_modificacion: args.fecha_modificacion.GraphQLNonNull
                    }}, { new: true}).exec((err, res) => {
                        console.log('test', res)
                        if(err) reject(err)
                        else resolve(res)
                    }))
                    
            })
        },
         // este mutation es para borrar datos a Contrato
        del_contrato: {
            type: ContratoInputType,
            args: {
                id_expediente: { type: GraphQLString },
                estatus: { type: GraphQLString }
            },
            resolve: authenticated ((parentValue, args, context) => {
                return conexion().then(db => db.collection('contrato').findOneAndUpdate({
                    id_expediente: args.id_expediente.GraphQLNonNull},
                    { $set:{
                        estatus: "I"                      	  
                    }}, { new: true }))
            })
        },
        // este es para ingresar datos a observaciones
        insert_observacion: {
            type: ObservacionInputType,
            args: {
                    desc_observacion: { type: GraphQLString },
                    id_expediente: { type: GraphQLString },
                    descripcion: { type: GraphQLString },
                    desc_proceso: { type: GraphQLString},
                    usuario: { type: GraphQLString},		
                    fecha_alta: { type: GraphQLString },	
                    fecha_modificacion: { type: GraphQLString },
                    estatus: { type: GraphQLString }
            },
            resolve: authenticated ((parentValue, args, context) => {
                return conexion().then(db => db.collection('observaciones').insertOne({
                    desc_observacion: args.id_observacion,
                    id_expediente: args.id_expediente,
                    descripcion: args.descripcion,
                    desc_proceso: args.id_proceso,
                    usuario: args.usuario,		
                    fecha_alta: args.fecha_alta,
                    fecha_modificacion: args.fecha_modificacion,
                    estatus: args.estatus
                })).then(response => response.ops[0])
            })
        },
        // este es para actualizar datos a observaciones
        act_observacion: {
            type: ObservacionInputType,
            args: {
                desc_observacion: { type: GraphQLInt },
                id_expediente: { type: GraphQLString },
                descripcion: { type: GraphQLString },
                desc_proceso: { type: GraphQLString},
                usuario: { type: GraphQLString},		
                fecha_alta: { type: GraphQLString },	
                fecha_modificacion: { type: GraphQLString },
                estatus: { type: GraphQLString }
            },
            resolve: authenticated ((parentValue, args, context) => {
                return conexion().then(db => db.collection('observaciones').findOneAndUpdate({id_expediente: args.id_expediente},
                    { $set:{
                        desc_observacion: { type: GraphQLInt },
                        descripcion: { type: GraphQLString },
                        desc_proceso: { type: GraphQLString},
                        usuario: { type: GraphQLString},		
                        fecha_alta: { type: GraphQLString },	
                        fecha_modificacion: { type: GraphQLString },
                        estatus: { type: GraphQLString }  
                    }},
                    { upsert: true }))
            })
        },
        // este es para borrar datos a observaciones
        del_observacion: {
            type: ContratoInputType,
            args: {                
                id_expediente: { type: GraphQLString },
                estatus: { type: GraphQLString }
            },
            resolve: authenticated ((parentValue, args, context) => {
                return conexion().then(db => db.collection('contrato').findOneAndUpdate({
                    id_expediente: args.id_expediente.GraphQLNonNull},
                    { $set:{
                        estatus: "I"                      	  
                    }}, { new: true }))
            })
        },
        //este es para ingresar datos a AudienciaAndAcuerdo
        insert_AudAcu:{
            type: AudAcuInputType,
            args: {
                    usuario: { type: GraphQLString },
                    id_expediente: { type: GraphQLString },
                    desc_estado: { type: GraphQLInt },		
                    fecha_modificacion: { type: GraphQLString },
                    fecha_alta: { type: GraphQLString },
                    fecha: { type: GraphQLString },		
                    horario: { type: GraphQLString }, 	
                    lugar: { type: GraphQLString },		
                    estatus: { type: GraphQLString }
            },
            resolve: authenticated ((parentValue, args, context) => {
                return conexion().then(db => db.collection('audiencia_acuerdo').insertOne({
                    usuario: args.usuario.GraphQLNonNull,
                    id_expediente: args.id_expediente.GraphQLNonNull,
                    desc_estado: args.id_estado.GraphQLNonNull,		
                    fecha_modificacion: args.fecha_modificacion.GraphQLNonNull,
                    fecha_alta: args.fecha_alta.GraphQLNonNull,
                    fecha: args.fecha.GraphQLNonNull,		
                    horario: args.horario.GraphQLNonNull, 	
                    lugar: args.lugar.GraphQLNonNull,		
                    estatus: args.estatus.GraphQLNonNull
                })).then(response => response.ops[0])
            })

        },
        //este es para actualizar datos a AudienciaAndAcuerdo
        act_AudAcu: {
            type: AudAcuInputType,
            filters: { type: GraphQLString },
            args: {
                usuario: { type: GraphQLString },
                id_expediente: { type: GraphQLString },
                desc_estado: { type: GraphQLInt },		
                fecha_modificacion: { type: GraphQLString },
                fecha_alta: { type: GraphQLString },
                fecha: { type: GraphQLString },		
                horario: { type: GraphQLString }, 	
                lugar: { type: GraphQLString },		
                usuario: { type: GraphQLString },	
                estatus: { type: GraphQLString }
            },
            resolve: authenticated ((parentValue, args, context) => {
                return onexion().then(db => db.collection('audiencia_acuerdo').findOneAndUpdate({id_expediente: args.id_expediente},
                    { $set:{
                        usuario: args.usuario.GraphQLNonNull,
                        desc_estado: args.id_estado.GraphQLNonNull,		
                        fecha_modificacion: args.fecha_modificacion.GraphQLNonNull,
                        fecha_alta: args.fecha_alta.GraphQLNonNull,
                        fecha: args.fecha.GraphQLNonNull,		
                        horario: args.horario.GraphQLNonNull, 	
                        lugar: args.lugar.GraphQLNonNull,		
                        usuario: args.usuario.GraphQLNonNull	
                    }},
                    { upsert: true }))
            })
        },
        //este es para borrar datos a AudienciaAndAcuerdo
        del_AudAcu: {
            type: AudAcuInputType,
            args: {
                id_expediente: { type: GraphQLString },	
                estatus: { type: GraphQLString }
            },
            resolve: authenticated ((parentValue, args, context) => {
                return conexion().then(db => db.collection('audiencia_acuerdo').findOneAndUpdate({
                    id_expediente: args.id_expediente.GraphQLNonNull},
                    { $set:{
                        estatus: "I"                      	  
                    }}, { new: true }))
            })
        },
        //este es para insertar datos a solicitud
        insert_solicitud:{
            type: SolicitudInputType,
            args: {
                id_expediente: { type: GraphQLString },
                solicitante: { type: GraphQLInt },
                proovedor: { type: GraphQLString },
                desc_sector: { type: GraphQLString },
                desc_entidad: { type: GraphQLString },
                desc_dependencia: { type: GraphQLString },
                contrato: { type: GraphQLString },
                motivos: { type: GraphQLString },
                desc_proceso: { type: GraphQLString },
                fecha_alta: { type: GraphQLString },
                fecha_modificacion: { type: GraphQLString },
                desc_asunto: { type: GraphQLString },
                fecha_recepcion: { type: GraphQLString },
                desc_procedimiento: { type: GraphQLString },
                numero: { type: GraphQLString },
                monto_total: { type: GraphQLString },
                instruccion: { type: GraphQLString },
                fecha_turno: { type: GraphQLString },
                desc_conciliador: { type: GraphQLString },
                descripcion: { type: GraphQLString },                
                complementaria: { type: GraphQLString },
                turnar_director: { type: GraphQLString },
                turnar_conciliador: { type: GraphQLString },
                audiencia: { type: GraphQLString },
                conclusion: { type: GraphQLString },
                observaciones: { type: GraphQLString },
                caratula: { type: GraphQLString },
                ver_expediente: { type: GraphQLString },
                fecha: { type: GraphQLString },
                desc_sentido: { type: GraphQLString },
                tpc: { type: GraphQLString },
                dias_tramite: { type: GraphQLString },
                monto: { type: GraphQLString },
                desc_moneda: { type: GraphQLString },
                acuerdo: { type: GraphQLString },
                beneficio: { type: GraphQLString },
                usuario: { type: GraphQLString },
                estatus: { type: GraphQLString }    
            },
            resolve: authenticated ((parentValue, args, context) => {
                return conexion().then(db => db.collection('solicitud').insertOne({ 
                    id_expediente: args.id_expediente,
                    solicitante: args.solicitante,
                    proovedor: args.proovedor,
                    desc_sector: args.desc_sector,
                    desc_entidad: args.desc_entidad,
                    desc_dependencia: args.desc_dependencia,
                    contrato: args.contrato,
                    motivos: args.motivos,
                    desc_proceso: args.desc_proceso,
                    fecha_alta: args.fecha_alta,
                    fecha_modificacion: args.fecha_modificacion,
                    desc_asunto: args.desc_asunto,
                    fecha_recepcion: args.fecha_recepcion,
                    desc_procedimiento: args.desc_procedimiento,
                    numero: args.numero,
                    monto_total: args.monto_total,
                    instruccion: args.instruccion,
                    fecha_turno: args.fecha_turno,
                    desc_conciliador: args.desc_conciliador,
                    descripcion: args.descripcion,            
                    complementaria: args.complementaria,
                    turnar_director: args.turnar_director,
                    turnar_conciliador: args.turnar_conciliador,
                    audiencia: args.audiencia,
                    conclusion: args.conclusion,
                    observaciones: args.observaciones,
                    caratula: args.caratula,
                    ver_expediente: args.ver_expediente,
                    fecha: args.fecha,
                    desc_sentido: args.desc_sentido,
                    tpc: args.tpc,
                    dias_tramite: args.dias_tramite,
                    monto: args.monto,
                    desc_moneda: args.desc_moneda,
                    acuerdo: args.acuerdo,
                    beneficio: args.beneficio,
                    usuario: args.usuario,
                    estatus: args.estatus
                })).then(response => response.ops[0])
            })
        },
        //este es para actualizar datos a solicitud
        act_solicitud: {
            type: SolicitudInputType,
            args: {
                id_expediente: { type: GraphQLString },
                solicitante: { type: GraphQLInt },
                proovedor: { type: GraphQLString },
                desc_sector: { type: GraphQLInt },
                desc_entidad: { type: GraphQLInt },
                desc_dependencia: { type: GraphQLInt },
                contrato: { type: GraphQLString },
                motivos: { type: GraphQLString },
                desc_proceso: { type: GraphQLInt },
                fecha_alta: { type: GraphQLString },
                fecha_modificacion: { type: GraphQLString },
                desc_asunto: { type: GraphQLInt },
                fecha_recepcion: { type: GraphQLString },
                desc_procedimiento: { type: GraphQLInt },
                numero: { type: GraphQLString },
                monto_total: { type: GraphQLString },
                instruccion: { type: GraphQLString },
                fecha_turno: { type: GraphQLString },
                desc_conciliador: { type: GraphQLInt },
                descripcion: { type: GraphQLString },
                contrato: { type: GraphQLString },
                complementaria: { type: GraphQLString },
                turnar_director: { type: GraphQLString },
                turnar_conciliador: { type: GraphQLString },
                audiencia: { type: GraphQLString },
                conclusion: { type: GraphQLString },
                observaciones: { type: GraphQLString },
                caratula: { type: GraphQLString },
                ver_expediente: { type: GraphQLString },
                fecha: { type: GraphQLString },
                desc_sentido: { type: GraphQLInt },
                tpc: { type: GraphQLString },
                dias_tramite: { type: GraphQLString },
                monto: { type: GraphQLString },
                desc_moneda: { type: GraphQLInt },
                acuerdo: { type: GraphQLString },
                beneficio: { type: GraphQLString },
                usuario: { type: GraphQLString },
                estatus: { type: GraphQLString }   
             },
            resolve: authenticated ((parentValue, args, context) => {
                return conexion().then(db => db.collection('solicitud').findOneAndUpdate({id_expediente: args.id_expediente},
                    { $set:{                        
                        solicitante: args.solicitante,
                        proovedor: args.proovedor,
                        desc_sector: args.desc_sector,
                        desc_entidad: args.desc_entidad,
                        desc_dependencia: args.desc_dependencia,
                        contrato: args.contrato,
                        motivos: args.motivos,
                        desc_proceso: args.desc_proceso,
                        fecha_alta: args.fecha_alta,
                        fecha_modificacion: args.fecha_modificacion,
                        desc_asunto: args.desc_asunto,
                        fecha_recepcion: args.fecha_recepcion,
                        desc_procedimiento: args.desc_procedimiento,
                        numero: args.numero,
                        monto_total: args.monto_total,
                        instruccion: args.instruccion,
                        fecha_turno: args.fecha_turno,
                        desc_conciliador: args.desc_conciliador,
                        desc_proceso: args.desc_proceso,
                        descripcion: args.descripcion,
                        contrato: args.contrato,
                        complementaria: args.complementaria,
                        turnar_director: args.turnar_director,
                        turnar_conciliador: args.turnar_conciliador,
                        audiencia: args.audiencia,
                        conclusion: args.conclusion,
                        observaciones: args.observaciones,
                        caratula: args.caratula,
                        ver_expediente: args.ver_expediente,
                        fecha: args.fecha,
                        desc_sentido: args.desc_sentido,
                        tpc: args.tpc,
                        dias_tramite: args.dias_tramite,
                        monto: args.monto,
                        desc_moneda: args.desc_moneda,
                        acuerdo: args.acuerdo,
                        beneficio: args.beneficio,
                        usuario: args.usuario,
                        estatus: args.estatus
                    }},
                    { upsert: true }))
            })
        },
        del_solicitud: {
            type: SolicitudInputType,
            args: {
                id_expediente: { type: GraphQLString },	
                estatus: { type: GraphQLString }
            },
            resolve: authenticated ((parentValue, args, context) => {
                return conexion().then(db => db.collection('solicitud').findOneAndUpdate({
                    id_expediente: args.id_expediente},
                    { $set:{
                        estatus: "I"                      	  
                    }}, { new: true }))
            })
        }
    })
});

module.exports = {
    mutation
  };