const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt} = graphql;

//Mutation And Query de Turnar_Director
const TurnarDInputType = new GraphQLObjectType({
    name: "TurnarDInputType",
    type: "Mutation",
    fields: {
        id_expediente: { type: GraphQLString },
        instruccion: { type: GraphQLString },
        fecha_turno: { type: GraphQLString }, //timestamp
        desc_director: { type: GraphQLInt },
        usuario: { type: GraphQLString },
        fecha_alta: { type: GraphQLString },		//timestamp
        fecha_modificacion: { type: GraphQLString },	//timestamp
        estatus: { type: GraphQLString }				
    }
});
const TurnarDQueryType = new GraphQLObjectType({
    name: "TurnarDQueryType",
    type: "Query",
    fields: {
        id_expediente: { type: GraphQLString },
        instruccion: { type: GraphQLString },
        fecha_turno: { type: GraphQLString }, //timestamp
        desc_director: { type: GraphQLString },
        usuario: { type: GraphQLString },
        fecha_alta: { type: GraphQLString },		//timestamp
        fecha_modificacion: { type: GraphQLString },	//timestamp
        estatus: { type: GraphQLString }
    }
});
const ContratoQueryType = new GraphQLObjectType({
    name: "ContratoQueryType",
    type: "Query",
    fields: {
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
    }
});
const ContratoInputType = new GraphQLObjectType({
    name: "ContratoInputType",
    type: "Mutation",
    fields: {
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
    }
});
//Mutation And Query de Observacion
const ObservacionInputType = new GraphQLObjectType({
    name: "ObservacionInputType",
    type: "Mutation",
    fields: {
        desc_observacion: { type: GraphQLInt },
        id_expediente: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        desc_proceso: { type: GraphQLString},
        usuario: { type: GraphQLString},		
        fecha_alta: { type: GraphQLString },	
        fecha_modificacion: { type: GraphQLString },
        estatus: { type: GraphQLString }
    }
});
const ObservacionQueryType = new GraphQLObjectType({
    name: "ObservacionQueryType",
    type: "Query",
    fields: {
        desc_observacion: { type: GraphQLInt },
        id_expediente: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        desc_proceso: { type: GraphQLString},
        usuario: { type: GraphQLString},		
        fecha_alta: { type: GraphQLString },	
        fecha_modificacion: { type: GraphQLString },
        estatus: { type: GraphQLString }
    }
});
//Mutation And Query de AudienciaAndAcuerdo
const AudAcuInputType = new GraphQLObjectType({
    name: "AudAcuInputType",
    type: "Mutation",
    fields: {
        usuario: { type: GraphQLString },
        id_expediente: { type: GraphQLString },
        desc_estado: { type: GraphQLInt },		
        fecha_modificacion: { type: GraphQLString },
        fecha_alta: { type: GraphQLString },
        fecha: { type: GraphQLString },		
        horario: { type: GraphQLString }, 	
        lugar: { type: GraphQLString },		
        estatus: { type: GraphQLString }
    }
});
const AudAcuQueryType = new GraphQLObjectType({
    name: "AudAcuQueryType",
    type: "Query",
    fields: {
        usuario: { type: GraphQLString },
        id_expediente: { type: GraphQLString },
        desc_estado: { type: GraphQLInt },		
        fecha_modificacion: { type: GraphQLString },
        fecha_alta: { type: GraphQLString },
        fecha: { type: GraphQLString },		
        horario: { type: GraphQLString }, 	
        lugar: { type: GraphQLString },		
        estatus: { type: GraphQLString }
    }
});
const SolicitudQueryType = new GraphQLObjectType({
    name: "SolicitudQueryType",
    type: "Query",
        fields: {
            id_expediente: { type: GraphQLString },
            solicitante: { type: GraphQLInt },
            proovedor: { type: GraphQLString },
            desc_sector: { type: GraphQLString },
            desc_entidad: { type: GraphQLString },
            desc_dependencia: { type: GraphQLString },
            contrato: { type: GraphQLString },
            motivos: { type: GraphQLString },
            fecha_alta: { type: GraphQLString },
            fecha_modificacion: { type: GraphQLString },
            desc_asunto: { type: GraphQLString },
            fecha_recepcion: { type: GraphQLString },
            dex_procedimiento: { type: GraphQLInt },
            numero: { type: GraphQLString },
            monto_total: { type: GraphQLString },
            instruccion: { type: GraphQLString },
            fecha_turno: { type: GraphQLString },
            desc_conciliador: { type: GraphQLString },
            desc_proceso: { type: GraphQLString },
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
            desc_sentido: { type: GraphQLString },
            tpc: { type: GraphQLString },
            dias_tramite: { type: GraphQLString },
            monto: { type: GraphQLString },
            desc_moneda: { type: GraphQLString },
            acuerdo: { type: GraphQLString },
            beneficio: { type: GraphQLString },
            usuario: { type: GraphQLString },
            estatus: { type: GraphQLString }
    }
});
const SolicitudInputType = new GraphQLObjectType({
    name: "SolicitudInputType",
    type: "Mutation",
    fields: {
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
        desc_proceso: { type: GraphQLInt },
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
    }
});

// Esto es para la ficha tecnica
const Solicitud = new GraphQLObjectType({
    name: "Solicitud",
    type: "Query",
    fields: {
        id_expediente: { type: GraphQLString },
        solicitante: { type: GraphQLInt },
        proveedor: { type: GraphQLString },
        sector: { type: GraphQLString},
        entidad: { type: GraphQLString },
        desc_dependencia: { type:GraphQLString },
        dependencia: { type: GraphQLString },
        motivos: { type: GraphQLString }, 
        proceso: { type: GraphQLString },
        usuario: { type: GraphQLString },
        monto_conciliacion: { type: GraphQLString },
        fecha_alta: { type: GraphQLString },
        fecha_modificacion: { type: GraphQLString },
        estatus: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        dependencia_conciliadora: { type: GraphQLInt}                             
    }
});

const Contrato = new GraphQLObjectType({
    name: "Contrato",
    type: "Query",
    fields: {
        id_contrato: { type: GraphQLString }, 
        id_expediente: { type: GraphQLString }, 
        numero_contrato: { type: GraphQLString }, 
        objeto_contrato: { type: GraphQLString }, 
        ley: { type: GraphQLString }, 
        materia: { type: GraphQLString }, 
        monto_contrato: { type: GraphQLString }, 
        monto_reclamacion: { type: GraphQLString }, 
        moneda: { type: GraphQLString }, 
        vigenciainicio: { type: GraphQLString }, 
        vigenciafin: { type: GraphQLString }, 
        plazoinicio: { type: GraphQLString }, 
        plazofin: { type: GraphQLString }, 
        usuario: { type: GraphQLString }, 
        fecha_alta: { type: GraphQLString }, 
        fecha_modificacion: { type: GraphQLString }, 
        estatus: { type: GraphQLString },
        dependencia_conciliadora: { type: GraphQLInt}
    }
});

const Convenio_Modificatorio = new GraphQLObjectType({
    name: "Convenio_Modificatorio",
    type: "Query",
    fields: {
        id_expediente: { type: GraphQLString },  
        numero_contrato: { type: GraphQLString }, 
        numero_modificatorio: { type: GraphQLString }, 
        tipo: { type: GraphQLString }, 
        tipo_monto: { type: GraphQLString }, 
        usuario: { type: GraphQLString }, 
        fecha_alta: { type: GraphQLString }, 
        fecha_modificacion: { type: GraphQLString }, 
        estatus: { type: GraphQLString },
        dependencia_conciliadora: { type: GraphQLInt }  
    }
});
const Complemento = new GraphQLObjectType({
    name: "Complemento",
    type: "Query",
    fields: {
        id_expediente: { type: GraphQLString },
        asunto: { type: GraphQLString },
        fecha_recepcion: { type: GraphQLString },
        procedimiento: { type: GraphQLString },
        numero: { type: GraphQLString },
        monto_total: { type: GraphQLString },
        usuario: { type: GraphQLString },
        fecha_alta: { type: GraphQLString },
        fecha_modificacion: { type: GraphQLString },
        estatus: { type: GraphQLString },
        dependencia_conciliadora: { type: GraphQLInt}
    }
});
const Turnar_Director = new GraphQLObjectType({
    name: "Turnar_Director",
    type: "Query",
    fields: {
        id_turnar_dir: { type: GraphQLString }, 
        id_expediente: { type: GraphQLString }, 
        instruccion: { type: GraphQLString }, 
        fecha_turno: { type: GraphQLString }, 
        director: { type: GraphQLString }, 
        usuario: { type: GraphQLString }, 
        fecha_alta: { type: GraphQLString }, 
        fecha_modificacion: { type: GraphQLString }, 
        estatus: { type: GraphQLString },
        dependencia_conciliadora: { type: GraphQLInt}
    }
});
const Turnar_Conciliador = new GraphQLObjectType({
    name: "Turnar_Conciliador",
    type: "Query",
    fields: {
        id_turnar_conc: { type: GraphQLString }, 
        id_expediente: { type: GraphQLString }, 
        instruccion: { type: GraphQLString }, 
        fecha_turno: { type: GraphQLString }, 
        conciliador: { type: GraphQLString }, 
        usuario: { type: GraphQLString }, 
        fecha_alta: { type: GraphQLString }, 
        fecha_modificacion: { type: GraphQLString }, 
        estatus: { type: GraphQLString },
        dependencia_conciliadora: { type: GraphQLInt}
    }
});
const Admision = new GraphQLObjectType({
    name: "Admision",
    type: "Query",
    fields: {
        id_expediente: { type: GraphQLString }, 
        acuerdo: { type: GraphQLString }, 
        fecha_acuerdo: { type: GraphQLString },
        causas: { type: GraphQLString }, 
        fecha_notificacion: { type: GraphQLString }, 
        fecha_cumplimiento: { type: GraphQLString },
        dependencia_conciliadora: { type: GraphQLInt}
    }
});
const Audiencia_Acuerdo = new GraphQLObjectType({
    name: "Audiencia_Acuerdo",
    type: "Query",
    fields: {
        id_audiencia: { type: GraphQLString }, 
        id_expediente: { type: GraphQLString }, 
        fecha: { type: GraphQLString },
        horario: { type: GraphQLString }, 
        lugar: { type: GraphQLString }, 
        usuario: { type: GraphQLString },
        fecha_alta: { type: GraphQLString }, 
        fecha_modificacion: { type: GraphQLString },
        estatus: { type: GraphQLString }, 
        ac_id_acuerdo: { type: GraphQLString },
        ac_id_acuerdo_audi: { type: GraphQLString }, 
        ac_acuerdo_audi: { type: GraphQLString },
        ac_causas: { type: GraphQLString },
        ac_esuncp: { type: GraphQLString }, 
        ac_descripcionuncp: { type: GraphQLString }, 
        ac_usuario: { type: GraphQLString }, 
        ac_fecha_alta: { type: GraphQLString }, 
        ac_fecha_modificacion: { type: GraphQLString }, 
        ac_estatus: { type: GraphQLString }
    }
});
const Conclusion = new GraphQLObjectType({
    name: "Conclusion",
    type: "Query",
    fields: {
        id_expediente: { type: GraphQLString },
        fecha: { type: GraphQLString },
        id_sentido: { type: GraphQLString },
        tpc: { type: GraphQLString },
        monto: { type: GraphQLString },
        acuerdo: { type: GraphQLString },        
        sentido: { type: GraphQLString },
        beneficio: { type: GraphQLString },
        usuario: { type: GraphQLString },
        fecha_alta: { type: GraphQLString },
        acuerdo_descripcion: { type: GraphQLString },
        fecha_modificacion: { type: GraphQLString },
        estatus: { type: GraphQLString },
        dependencia_conciliadora: { type: GraphQLInt}
    }
});
const Observaciones = new GraphQLObjectType({
    name: "Observaciones",
    type: "Query",
    fields: {
        id_observacion: { type: GraphQLString }, 
        id_expediente: { type: GraphQLString }, 
        descripcion: { type: GraphQLString }, 
        proceso: { type: GraphQLString },
        usuario: { type: GraphQLString }, 
        fecha_alta: { type: GraphQLString }, 
        fecha_modificacion: { type: GraphQLString }, 
        estatus: { type: GraphQLString }
    }
});
const ATramite = new GraphQLObjectType({
    name: "ATramite",
    type: "Query",
    fields: {
        id_expediente: { type: GraphQLString },
        proveedor: { type: GraphQLString },
        dependencia: { type: GraphQLString },
        fecha_alta: { type: GraphQLString },
        objeto_contrato: { type: GraphQLString },
        id_ley: { type: GraphQLString }, 
        ley: { type: GraphQLString }, 
        asunto: { type: GraphQLString },
        motivos: { type: GraphQLString },
        monto_contrato: { type: GraphQLString },
        monto_reclamacion: { type: GraphQLString },
        asunto: { type: GraphQLString },
        dependencia_conciliadora:  { type: GraphQLInt }
    }
});
const Asuntos_Atendidos_Primero = new GraphQLObjectType({
    name: "Asuntos_Atendidos_Primero",
    type: "Query",
    fields: {
        recibidas: { type: GraphQLInt },
        concluidas: { type: GraphQLInt },
        en_tramite: { type: GraphQLInt }   
    }
});
const Asuntos_Atendidos = new GraphQLObjectType({
    name: "Asuntos_Atendidos",
    type: "Query",
    fields: {
        acuerdo_voluntades: { type: GraphQLInt },
        a_salvo_derechos: { type: GraphQLInt },
        otras: { type: GraphQLInt }             
    }
});
const generico = new GraphQLObjectType({
    name: "Generico",
    type: "Query",
    fields:{
        descripcion: { type: GraphQLString }
    }
});
const Totales = new GraphQLObjectType({
    name: "Totales",
    type: "Query",
    fields:{
        total: { type: GraphQLString},
        dependencia_conciliadora: { type: GraphQLInt}
    }
});
const Total_filtros = new GraphQLObjectType({
    name: "Total_filtros",
    type: "Query",
    fields:{
        total: { type: GraphQLString}
    }
});
const Cuantos_a_salvo_de_derechos = new GraphQLObjectType({
    name: "Cuantos_a_salvo_de_derechos",
    type: "Query",
    fields: {
        id_expediente: { type: GraphQLString },
        recibidas: { type: GraphQLString }
    }
});
const Cuantos_acuerdo_de_voluntades = new GraphQLObjectType({
    name: "Cuantos_acuerdo_de_voluntades",
    type: "Query",
    fields: {
        id_expediente: { type: GraphQLString },
        recibidas: { type: GraphQLString }        
    }
});
const Cuantos_concluidas  = new GraphQLObjectType({
    name: "Cuantos_concluidas",
    type: "Query",
    fields: {
        id_expediente: { type: GraphQLString },
        recibidas: { type: GraphQLString }
    }
});
const Cuantos_en_tramite = new GraphQLObjectType({
    name: "Cuantos_en_tramite",
    type: "Query",
    fields: {
        id_expediente: { type: GraphQLString },
        recibidas: { type: GraphQLString }   
    }
}); 
const Cuantos_otros = new GraphQLObjectType({
    name: "Cuantos_otros",
    type: "Query",
    fields: {
        id_expediente: { type: GraphQLString },
        recibidas: { type: GraphQLString }
    }
}); 
const Cuantos_recibidas = new GraphQLObjectType({
    name: "Cuantos_recibidas",
    type: "Query",
    fields: {
        id_expediente: { type: GraphQLString },
        recibidas: { type: GraphQLString }
    }
});


module.exports = {
  
    AudAcuInputType,
    AudAcuQueryType,

    ContratoQueryType,
    ContratoInputType, 

    SolicitudQueryType,
    SolicitudInputType,

    ObservacionQueryType,
    ObservacionInputType,

    TurnarDQueryType,
    TurnarDInputType,
    
    Solicitud,
    Contrato,
    Convenio_Modificatorio,
    Turnar_Director,
    Complemento,
    Turnar_Conciliador,
    Admision,
    Audiencia_Acuerdo,
    Conclusion,
    Observaciones,
    ATramite,
    Asuntos_Atendidos_Primero, 
    Asuntos_Atendidos,
    generico,
    Cuantos_a_salvo_de_derechos, 
    Cuantos_acuerdo_de_voluntades, 
    Cuantos_concluidas,
    Cuantos_en_tramite, 
    Cuantos_otros, 
    Cuantos_recibidas,
    Totales,
    Total_filtros

};
