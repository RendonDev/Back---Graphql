const { authenticated } = require('../autenticacion/utils')
const { conexion } = require('./conexion')
const { GraphQLObjectType,GraphQLNonNull, GraphQLList , GraphQLString, GraphQLInt} = require("graphql")
const { AudAcuQueryType, ContratoQueryType, ObservacionQueryType, TurnarDQueryType, 
        SolicitudQueryType, Solicitud, Contrato, Convenio_Modificatorio,Turnar_Director, 
        Turnar_Conciliador, Audiencia_Acuerdo,Conclusion, Complemento, Observaciones,
        Admision, ATramite,Asuntos_Atendidos, Asuntos_Atendidos_Primero, generico,
        Cuantos_a_salvo_de_derechos, Cuantos_acuerdo_de_voluntades, Cuantos_concluidas,
        Cuantos_en_tramite, Cuantos_otros, Cuantos_recibidas, Totales,Total_filtros} = require('./types')
const { db } = require("../src/reportes");

const query = new GraphQLObjectType({
   name: "Query",    
   type: "Query",
   fields: () => ({
       
       Contrato1: {
           type: new GraphQLList(new GraphQLNonNull(ContratoQueryType)),
           args: { },
           resolve: authenticated ((parentValue, args, context) =>  {
               return  conexion().then(db => db.collection('contrato').find().toArray())
           })
       },
       Solicitud1: {
            type: new GraphQLList(new GraphQLNonNull(Solicitud)),
            args: { },

            resolve: authenticated ((parentValue, args, context) =>  {
                return conexion().then(db => db.collection('solicitud').find().toArray())
            })
        },
        Turnar_Director1: {
            type: new GraphQLList(new GraphQLNonNull(TurnarDQueryType)),
            args: { },
           resolve: authenticated ((parentValue, args, context) =>  {
               return  conexion().then(db => db.collection('turnar_director').find().toArray())
           })
        },
        Observacion: {
            type: new GraphQLList(new GraphQLNonNull(ObservacionQueryType)),
            args: { },
           resolve: authenticated ((parentValue, args, context) =>  {
               return  conexion().then(db => db.collection('observaciones').find().toArray())
           })
        },
        AudAndAcu: {
            type: new GraphQLList(new GraphQLNonNull(AudAcuQueryType)),
            args: { },
           resolve: authenticated ((parentValue, args, context) =>  {
               return  conexion().then(db => db.collection('audiencia_acuerdo').find().toArray())
           })
        },
        
        //Esta es la Seccion de Asuntos en Tramite
        ATramite:{
            type: new GraphQLList(new GraphQLNonNull(ATramite)),
            args: { id_expediente: { type: GraphQLString },
                    proveedor: { type: GraphQLString },       
                    id_ley: { type: GraphQLString },             
                    fecha_inicio: { type: GraphQLString },
                    fecha_fin: { type: GraphQLString },
                    objeto_contrato: { type: GraphQLString },
                    monto_contrato: { type: GraphQLString },
                    monto_reclamacion: { type: GraphQLString },
                    dependencia: { type: GraphQLString },
                    id_asunto: { type: GraphQLString },       
                    motivos: { type: GraphQLString },
                    dependencia_conciliadora: { type: GraphQLInt }            
                    },              

            resolve: authenticated( async (parentValue, args, context) => {

                var str_fecha_inicio
                var str_fecha_fin
                var fecha_hoy
                var f = new Date();
                //fecha_hoy = "'" + f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + "'";
                fecha_hoy = "'" + "31-12-" + f.getFullYear() + "'";                
                
                if(args.fecha_inicio == ''){
                    str_fecha_inicio = 'NULL'
                }else{
                    str_fecha_inicio = "'"+ args.fecha_inicio + "'"
                };
                
                if(args.fecha_fin == ''){
                    str_fecha_fin = 'NULL'
                }else{
                    str_fecha_fin = "'"+ args.fecha_fin + "'"
                    
                };           
                
                const query = `   select
                cs.id_expediente,
                cs.proveedor,
                cs.dependencia,
                TO_CHAR(cs.fecha_alta, 'DD-MM-YYYY') fecha_alta,
                cc.objeto_contrato,
                cc.id_ley, 
                cgl.descripcion ley, 
                cs.motivos,
                cc.monto_contrato,
                cc.monto_reclamacion,             
                cf.id_asunto,                
                cga.descripcion asunto,
                cs.dependencia_conciliadora
                from conccore_solicitud cs
                left join conctra_contrato cc on cs.id_expediente = cc.id_expediente
                left join conccat_generico cgl on cgl.id = cc.id_ley
                left join conctra_complemento cf on cs.id_expediente = cf.id_expediente and cs.dependencia_conciliadora = cf.dependencia_conciliadora
                left join conccat_generico cga on cf.id_asunto = cga.id
                where cs.id_expediente like '%${args.id_expediente}%'
                and cs.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                and coalesce(cs.proveedor, '' ) like '%${args.proveedor}%'            
                and coalesce(cast(cs.motivos as text), '') like '%${args.motivos}%'
                and coalesce(cast(cc.id_ley as text), '') like '%${args.id_ley}%'                
                and coalesce(cc.objeto_contrato, '') like '%${args.objeto_contrato}%'
                and coalesce(cast(cc.monto_contrato as text), '') like '%${args.monto_contrato}%'                  
                and coalesce(cast(cc.monto_reclamacion as text), '') like '%${args.monto_reclamacion}%'
                and coalesce(cs.dependencia, '') like '%${args.dependencia}%'
                and coalesce(cast(cf.id_asunto as TEXT), '') like '%${args.id_asunto}%'
                and cs.estatus = 'A'            
                and TO_DATE(TO_CHAR(cs.fecha_alta, 'DD-MM-YYYY') ,'DD-MM-YYYY') 
                    BETWEEN to_date(coalesce(${str_fecha_inicio}, '01-01-2016'), 'DD-MM-YYYY') 
                    and  to_date(coalesce(${str_fecha_fin},  ${fecha_hoy}), 'DD-MM-YYYY') 
                    order by id_expediente, fecha_alta asc;`;                

                const values = [args.id_expediente,args.dependencia_conciliadora];
                
                return db
                .manyOrNone(query, values)
                .then(res => res)
                .catch(err => err) 
            })
        },
        //Esta es asuntos atendidos          
        Totales:{
            type: new GraphQLList(new GraphQLNonNull(Totales)), 
            args: { 
                    dependencia_conciliadora: { type: GraphQLInt }            
                    },             
            resolve: authenticated((parentValue,args, context) => {
                const query =  `select
                count(cs.id_expediente) total from conccore_solicitud cs where cs.dependencia_conciliadora = '${args.dependencia_conciliadora}';`;

                const values = [args.dependencia_conciliadora];
                 return db
                .manyOrNone(query, values)
                .then(res => res)
                .catch(err => err) 
            })
        },
        Total_filtros:{
            type: new GraphQLList(new GraphQLNonNull(Total_filtros)), 
            args: {
                id_expediente: { type: GraphQLString },
                proveedor: { type: GraphQLString },       
                id_ley: { type: GraphQLString },             
                fecha_inicio: { type: GraphQLString },
                fecha_fin: { type: GraphQLString },
                objeto_contrato: { type: GraphQLString },
                monto_contrato: { type: GraphQLString },
                monto_reclamacion: { type: GraphQLString },
                dependencia: { type: GraphQLString },
                id_asunto: { type: GraphQLString },
                motivos: { type: GraphQLString },                
            },           
            resolve: authenticated((parentValue,args, context) => {

                var str_fecha_inicio
                var str_fecha_fin
                var fecha_hoy
                var f = new Date();
                //fecha_hoy = "'" + f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + "'";
                fecha_hoy = "'" + "31-12-" + f.getFullYear() + "'";                
                
                if(args.fecha_inicio == ''){
                    str_fecha_inicio = 'NULL'
                }else{
                    str_fecha_inicio = "'"+ args.fecha_inicio + "'"
                };
                
                if(args.fecha_fin == ''){
                    str_fecha_fin = 'NULL'
                }else{
                    str_fecha_fin = "'"+ args.fecha_fin + "'"
                    
                };   
                const query =  `select 
                count(cs.id_expediente) total 
                from conccore_solicitud cs 
                left join conctra_contrato cc on cs.id_expediente = cc.id_expediente
                left join conccat_generico cgl on cgl.id = cc.id_ley
                left join conctra_complemento cf on cs.id_expediente = cf.id_expediente              
                left join conccat_generico cga on cf.id_asunto = cga.id
                where cs.id_expediente like '%${args.id_expediente}%'
                and cs.proveedor like '%${args.proveedor}%'            
                and coalesce(cast(cc.id_ley as text), '') like '%${args.id_ley}%'            
                and coalesce(cc.objeto_contrato, '') like '%${args.objeto_contrato}%'
                and coalesce(cast(cs.motivos as text), '') like '%${args.motivos}%'
                and coalesce(cast(cc.monto_contrato as text), '') like '%${args.monto_contrato}%'                  
                and coalesce(cast(cc.monto_reclamacion as text), '') like '%${args.monto_reclamacion}%'
                and coalesce(cs.dependencia, '') like '%${args.dependencia}%'
                and coalesce(cast(cf.id_asunto as TEXT), '') like '%${args.id_asunto}%'
                and cs.estatus = 'A'            
                and TO_DATE(TO_CHAR(cs.fecha_alta, 'DD-MM-YYYY') ,'DD-MM-YYYY') 
                    BETWEEN to_date(coalesce(${str_fecha_inicio}, '01-01-2016'), 'DD-MM-YYYY') 
                    and  to_date(coalesce(${str_fecha_fin},  ${fecha_hoy}), 'DD-MM-YYYY') ;`;

                 return db
                .manyOrNone(query)
                .then(res => res)
                .catch(err => err) 
            })
        },
        Asuntos_Atendidos:{
            type: new GraphQLList(new GraphQLNonNull(Asuntos_Atendidos)),
            args: { fecha_inicio: { type: GraphQLString },
                    fecha_fin: { type: GraphQLString },
                    dependencia_conciliadora: { type: GraphQLInt }
                    },
            resolve: authenticated((parentValue, args, context) => {

                var str_fecha_inicio
                var str_fecha_fin
                var fecha_hoy
                var f = new Date();
                //fecha_hoy = "'" + f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + "'";
                fecha_hoy = "'" + "31-12-" + f.getFullYear() + "'";                
                
                if(args.fecha_inicio == ''){
                    str_fecha_inicio = 'NULL'
                }else{
                    str_fecha_inicio = "'"+ args.fecha_inicio + "'"
                };
                
                if(args.fecha_fin == ''){
                    str_fecha_fin = 'NULL'
                }else{
                    str_fecha_fin = "'"+ args.fecha_fin + "'"
                    
                };           

                const query = `  select               
                a.count Acuerdo_Voluntades, 
                b.count A_Salvo_Derechos, 
                c.count Otras
                from 
                (select 
                 count(cc.id_expediente)
                 from conctra_conclusion cc  
                 left join conccat_generico cgl on cgl.id = cc.id_sentido
                 where cgl.id = 63
                 and cc.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                 and cc.estatus = 'A'
                 and TO_DATE(TO_CHAR(cc.fecha_alta, 'DD-MM-YYYY') ,'DD-MM-YYYY') 
                    BETWEEN to_date(coalesce(${str_fecha_inicio}, '01-01-2016'), 'DD-MM-YYYY') 
                    and  to_date(coalesce(${str_fecha_fin},  ${fecha_hoy}), 'DD-MM-YYYY')) as a,(        
                 select count(cc.id_expediente)
                 from conctra_conclusion cc  
                 left join conccat_generico cgl on cgl.id = cc.id_sentido
                 where cgl.id = 62
                 and cc.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                 and cc.estatus = 'A'
                 and TO_DATE(TO_CHAR(cc.fecha_alta, 'DD-MM-YYYY') ,'DD-MM-YYYY') 
                    BETWEEN to_date(coalesce(${str_fecha_inicio}, '01-01-2016'), 'DD-MM-YYYY') 
                    and  to_date(coalesce(${str_fecha_fin},  ${fecha_hoy}), 'DD-MM-YYYY')) as b,(               
                 select count(cc.id_expediente)
                 from conctra_conclusion cc  
                 left join conccat_generico cgl on cgl.id = cc.id_sentido
                 where cgl.id not in (63,62)
                 and cc.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                 and cc.estatus = 'A'
                 and TO_DATE(TO_CHAR(cc.fecha_alta, 'DD-MM-YYYY') ,'DD-MM-YYYY') 
                    BETWEEN to_date(coalesce(${str_fecha_inicio}, '01-01-2016'), 'DD-MM-YYYY') 
                    and  to_date(coalesce(${str_fecha_fin},  ${fecha_hoy}), 'DD-MM-YYYY')) as c;`;

                return db
                .manyOrNone(query)                
                .then(res => res)
                .catch(err => err)
            })
        },
        Asuntos_Atendidos_Primero:{
            type: new GraphQLList(new GraphQLNonNull(Asuntos_Atendidos_Primero)),
            args: { fecha_inicio: { type: GraphQLString },
                    fecha_fin: { type: GraphQLString },
                    dependencia_conciliadora: { type: GraphQLInt }
                },
            resolve: authenticated((parentValue, args, context) => {

                var str_fecha_inicio
                var str_fecha_fin
                var fecha_hoy
                var f = new Date();
                //fecha_hoy = "'" + f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + "'";
                fecha_hoy = "'" + "31-12-" + f.getFullYear() + "'";                
                
                if(args.fecha_inicio == ''){
                    str_fecha_inicio = 'NULL'
                }else{
                    str_fecha_inicio = "'"+ args.fecha_inicio + "'"
                };
                
                if(args.fecha_fin == ''){
                    str_fecha_fin = 'NULL'
                }else{
                    str_fecha_fin = "'"+ args.fecha_fin + "'"
                    
                };           

                const query = `select 
                a.count Recibidas, 
                b.count Concluidas, 
                c.count En_Tramite
                from(
                select count(cs.id_expediente) 
                from conccore_solicitud cs
                where cs.id_proceso <= 2
                and cs.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                and cs.estatus = 'A'
                and TO_DATE(TO_CHAR(cs.fecha_alta, 'DD-MM-YYYY') ,'DD-MM-YYYY') 
                   BETWEEN to_date(coalesce(${str_fecha_inicio}, '01-01-2016'), 'DD-MM-YYYY') 
                   and  to_date(coalesce(${str_fecha_fin},  ${fecha_hoy}), 'DD-MM-YYYY')) as a,
                (select count(li.id_expediente) 
                from conccore_solicitud li 
                where li.id_proceso = 8
                and li.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                and li.estatus = 'A'
                and TO_DATE(TO_CHAR(li.fecha_alta, 'DD-MM-YYYY') ,'DD-MM-YYYY') 
                   BETWEEN to_date(coalesce(${str_fecha_inicio}, '01-01-2016'), 'DD-MM-YYYY') 
                   and  to_date(coalesce(${str_fecha_fin},  ${fecha_hoy}), 'DD-MM-YYYY')) as b,
                (select count(li.id_expediente) 
                from conccore_solicitud li 
                where li.id_proceso not in (1,2,8)
                and li.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                and li.estatus = 'A'
                and TO_DATE(TO_CHAR(li.fecha_alta, 'DD-MM-YYYY') ,'DD-MM-YYYY') 
                   BETWEEN to_date(coalesce(${str_fecha_inicio}, '01-01-2016'), 'DD-MM-YYYY') 
                   and  to_date(coalesce(${str_fecha_fin},  ${fecha_hoy}), 'DD-MM-YYYY')) as c;`;

                return db
                .manyOrNone(query)                
                .then(res => res)
                .catch(err => err)
            })
        },                          
        Cuantos_acuerdo_de_voluntades: {
            type: new GraphQLList(new GraphQLNonNull(Cuantos_acuerdo_de_voluntades)),
            args: { fecha_inicio: { type: GraphQLString },
                    fecha_fin: { type: GraphQLString },
                    dependencia_conciliadora: { type: GraphQLInt }
                },
            resolve: authenticated((parentValue, args, context) => {
                var str_fecha_inicio
                var str_fecha_fin
                var fecha_hoy
                var f = new Date();
                //fecha_hoy = "'" + f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + "'";
                fecha_hoy = "'" + "31-12-" + f.getFullYear() + "'";                
                
                if(args.fecha_inicio == ''){
                    str_fecha_inicio = 'NULL'
                }else{
                    str_fecha_inicio = "'"+ args.fecha_inicio + "'"
                };
                
                if(args.fecha_fin == ''){
                    str_fecha_fin = 'NULL'
                }else{
                    str_fecha_fin = "'"+ args.fecha_fin + "'"
                    
                };           

                const query = `select 
                cc.id_expediente, 
                cgl.descripcion recibidas 
                from conctra_conclusion cc
                left join conccat_generico cgl on cgl.id = cc.id_sentido
                where cgl.id = 63
                and cc.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                and cc.estatus = 'A'
                and TO_DATE(TO_CHAR(cc.fecha_alta, 'DD-MM-YYYY') ,'DD-MM-YYYY') 
                   BETWEEN to_date(coalesce(${str_fecha_inicio}, '01-01-2016'), 'DD-MM-YYYY') 
                   and  to_date(coalesce(${str_fecha_fin},  ${fecha_hoy}), 'DD-MM-YYYY');`;

                return db
                .manyOrNone(query)                
                .then(res => res)
                .catch(err => err)
            })         
        },        
        Cuantos_a_salvo_de_derechos: {
            type: new GraphQLList(new GraphQLNonNull(Cuantos_a_salvo_de_derechos)),
            args: { fecha_inicio: { type: GraphQLString },
                    fecha_fin: { type: GraphQLString },
                    dependencia_conciliadora: { type: GraphQLInt }
                },
            resolve: authenticated((parentValue, args, context) => {
                var str_fecha_inicio
                var str_fecha_fin
                var fecha_hoy
                var f = new Date();
                //fecha_hoy = "'" + f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + "'";
                fecha_hoy = "'" + "31-12-" + f.getFullYear() + "'";                
                
                if(args.fecha_inicio == ''){
                    str_fecha_inicio = 'NULL'
                }else{
                    str_fecha_inicio = "'"+ args.fecha_inicio + "'"
                };
                
                if(args.fecha_fin == ''){
                    str_fecha_fin = 'NULL'
                }else{
                    str_fecha_fin = "'"+ args.fecha_fin + "'"
                    
                };           

                const query = `select 
                id_expediente, 
                cgl.descripcion recibidas 
                from conctra_conclusion cc
	            left join conccat_generico cgl on cgl.id = cc.id_sentido
                where cgl.id = 62
                and cc.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                and cc.estatus = 'A'
                and TO_DATE(TO_CHAR(cc.fecha_alta, 'DD-MM-YYYY') ,'DD-MM-YYYY') 
                   BETWEEN to_date(coalesce(${str_fecha_inicio}, '01-01-2016'), 'DD-MM-YYYY') 
                   and  to_date(coalesce(${str_fecha_fin},  ${fecha_hoy}), 'DD-MM-YYYY');`;
                
                return db
                .manyOrNone(query)                
                .then(res => res)
                .catch(err => err)
            })         
        },	    
        Cuantos_otros: {
            type: new GraphQLList(new GraphQLNonNull(Cuantos_otros)),
            args: { fecha_inicio: { type: GraphQLString },
                    fecha_fin: { type: GraphQLString },
                    dependencia_conciliadora: { type: GraphQLInt }
                },
            resolve: authenticated((parentValue, args, context) => {
                var str_fecha_inicio
                var str_fecha_fin
                var fecha_hoy
                var f = new Date();
                //fecha_hoy = "'" + f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + "'";
                fecha_hoy = "'" + "31-12-" + f.getFullYear() + "'";                
                
                if(args.fecha_inicio == ''){
                    str_fecha_inicio = 'NULL'
                }else{
                    str_fecha_inicio = "'"+ args.fecha_inicio + "'"
                };
                
                if(args.fecha_fin == ''){
                    str_fecha_fin = 'NULL'
                }else{
                    str_fecha_fin = "'"+ args.fecha_fin + "'"
                    
                };           

                const query = `select 
                id_expediente, 
                cgl.descripcion recibidas 
                from conctra_conclusion cc
	            left join conccat_generico cgl on cgl.id = cc.id_sentido
                where cgl.id not in (62,63)
                and cc.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                and cc.estatus = 'A'
                and TO_DATE(TO_CHAR(cc.fecha_alta, 'DD-MM-YYYY') ,'DD-MM-YYYY') 
                   BETWEEN to_date(coalesce(${str_fecha_inicio}, '01-01-2016'), 'DD-MM-YYYY') 
                   and  to_date(coalesce(${str_fecha_fin},  ${fecha_hoy}), 'DD-MM-YYYY');`;
                
                return db
                .manyOrNone(query)                
                .then(res => res)
                .catch(err => err)
            })         
        },        
        Cuantos_recibidas: {
            type: new GraphQLList(new GraphQLNonNull(Cuantos_recibidas)),
            args: { fecha_inicio: { type: GraphQLString },
                    fecha_fin: { type: GraphQLString },
                    dependencia_conciliadora: { type: GraphQLInt }
                },
            resolve: authenticated((parentValue, args, context) => {
                var str_fecha_inicio
                var str_fecha_fin
                var fecha_hoy
                var f = new Date();
                //fecha_hoy = "'" + f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + "'";
                fecha_hoy = "'" + "31-12-" + f.getFullYear() + "'";                
                
                if(args.fecha_inicio == ''){
                    str_fecha_inicio = 'NULL'
                }else{
                    str_fecha_inicio = "'"+ args.fecha_inicio + "'"
                };
                
                if(args.fecha_fin == ''){
                    str_fecha_fin = 'NULL'
                }else{
                    str_fecha_fin = "'"+ args.fecha_fin + "'"
                    
                };           

                const query = `select 
                cs.id_expediente, 
                cgl.descripcion recibidas 
                from conccore_solicitud cs 
	            inner join conccat_proceso cgl on cgl.id_proceso = cs.id_proceso
                where cs.id_proceso <=2
                and cs.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                and cs.estatus = 'A'
                and TO_DATE(TO_CHAR(cs.fecha_alta, 'DD-MM-YYYY') ,'DD-MM-YYYY') 
                   BETWEEN to_date(coalesce(${str_fecha_inicio}, '01-01-2016'), 'DD-MM-YYYY') 
                   and  to_date(coalesce(${str_fecha_fin},  ${fecha_hoy}), 'DD-MM-YYYY');`;
                
                return db
                .manyOrNone(query)                
                .then(res => res)
                .catch(err => err)
            })         
        },           
        Cuantos_concluidas: {
            type: new GraphQLList(new GraphQLNonNull(Cuantos_concluidas)),
            args: { fecha_inicio: { type: GraphQLString },
                    fecha_fin: { type: GraphQLString },
                    dependencia_conciliadora: { type: GraphQLInt }
                },
            resolve: authenticated((parentValue, args, context) => {
                var str_fecha_inicio
                var str_fecha_fin
                var fecha_hoy
                var f = new Date();
                //fecha_hoy = "'" + f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + "'";
                fecha_hoy = "'" + "31-12-" + f.getFullYear() + "'";                
                
                if(args.fecha_inicio == ''){
                    str_fecha_inicio = 'NULL'
                }else{
                    str_fecha_inicio = "'"+ args.fecha_inicio + "'"
                };
                
                if(args.fecha_fin == ''){
                    str_fecha_fin = 'NULL'
                }else{
                    str_fecha_fin = "'"+ args.fecha_fin + "'"
                    
                };           

                const query = `select 
                cs.id_expediente, 
                cgl.descripcion recibidas 
                from conccore_solicitud cs 
	            inner join conccat_proceso cgl on cgl.id_proceso = cs.id_proceso
                where cs.id_proceso = 8
                and cs.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                and cs.estatus = 'A'
                and TO_DATE(TO_CHAR(cs.fecha_alta, 'DD-MM-YYYY') ,'DD-MM-YYYY') 
                   BETWEEN to_date(coalesce(${str_fecha_inicio}, '01-01-2016'), 'DD-MM-YYYY') 
                   and  to_date(coalesce(${str_fecha_fin},  ${fecha_hoy}), 'DD-MM-YYYY');`;
                
                return db
                .manyOrNone(query)                
                .then(res => res)
                .catch(err => err)
            })         
        },       
        Cuantos_en_tramite: {
            type: new GraphQLList(new GraphQLNonNull(Cuantos_en_tramite)),
            args: { fecha_inicio: { type: GraphQLString },
                    fecha_fin: { type: GraphQLString },
                    dependencia_conciliadora: { type: GraphQLInt }
                },
            resolve: authenticated((parentValue, args, context) => {
                var str_fecha_inicio
                var str_fecha_fin
                var fecha_hoy
                var f = new Date();
                //fecha_hoy = "'" + f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + "'";
                fecha_hoy = "'" + "31-12-" + f.getFullYear() + "'";                
                
                if(args.fecha_inicio == ''){
                    str_fecha_inicio = 'NULL'
                }else{
                    str_fecha_inicio = "'"+ args.fecha_inicio + "'"
                };
                
                if(args.fecha_fin == ''){
                    str_fecha_fin = 'NULL'
                }else{
                    str_fecha_fin = "'"+ args.fecha_fin + "'"
                    
                };           

                const query = `select 
                cs.id_expediente, 
                cgl.descripcion recibidas 
                from conccore_solicitud cs 	     
	            inner join conccat_proceso cgl on cgl.id_proceso = cs.id_proceso
                where cs.id_proceso not in (1,2,8)
                and cs.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                and cs.estatus = 'A'
                and TO_DATE(TO_CHAR(cs.fecha_alta, 'DD-MM-YYYY') ,'DD-MM-YYYY') 
                   BETWEEN to_date(coalesce(${str_fecha_inicio}, '01-01-2016'), 'DD-MM-YYYY') 
                   and  to_date(coalesce(${str_fecha_fin},  ${fecha_hoy}), 'DD-MM-YYYY');`;
                
                return db
                .manyOrNone(query)                
                .then(res => res)
                .catch(err => err)
            })         
        },       
        // Esta es la seccion de Ficha Tecnica
        Solicitud:{
            type: new GraphQLList(new GraphQLNonNull(Solicitud)),
            args: { id_expediente: { type: GraphQLString }, dependencia_conciliadora: { type: GraphQLInt} },    
            resolve: authenticated((parentValue, args, context) => {
                const query = `
                select 
                s.id_expediente, 
                s.solicitante, 
                s.proveedor, 
                s.id_sector, 
                cgs.descripcion sector,
                s.id_entidad, 
                cge.descripcion entidad, 
                s.id_dependencia,
                case when s.id_dependencia is null then s.dependencia else cg.descripcion end desc_dependencia,
                s.id_proceso, 
                p.descripcion proceso, 
                s.monto monto_conciliacion, 
                s.usuario, 
                TO_CHAR(s.fecha_alta, 'DD-MM-YYYY') fecha_alta, 
                TO_CHAR(s.fecha_modificacion, 'DD-MM-YYYY') fecha_modificacion, 
                s.estatus,
                cg.descripcion
                from conccore_solicitud s 
                left join conccat_generico cg  on s.id_dependencia = cg.id
                left join conccat_generico cge on s.id_entidad     = cge.id
                left join conccat_generico cgs on s.id_sector      = cgs.id
                inner join conccat_proceso  p  on p.id_proceso     = s.id_proceso
                where s.id_expediente = $1
                and s.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                and s.estatus  = 'A';`;

                const values = [args.id_expediente];
                return db
                .manyOrNone(query, values)
                .then(res => res)
                .catch(err => err)
                
                
            })            
        },
        Contrato:{
            type: new GraphQLList(new GraphQLNonNull(Contrato)),
            args: { id_expediente: { type: GraphQLString }, dependencia_conciliadora: { type: GraphQLInt}},
            resolve: authenticated((parentValue, args, context) => {
                const query = `select 
                c.id_contrato, 
                c.id_expediente, 
                c.numero_contrato, 
                c.objeto_contrato, 
                c.id_ley, 
                cgl.descripcion ley, 
                c.id_materia, 
                cgm.descripcion materia, 
                c.monto_contrato, 
                c.monto_reclamacion, 
                c.id_moneda, 
                cgn.descripcion moneda, 
                TO_CHAR(c.vigenciainicio, 'DD-MM-YYYY') vigenciainicio,
                TO_CHAR(c.vigenciafin, 'DD-MM-YYYY') vigenciafin,
                TO_CHAR(c.plazoinicio, 'DD-MM-YYYY') plazoinicio,
                TO_CHAR(c.plazofin, 'DD-MM-YYYY') plazofin,
                c.usuario, 
                TO_CHAR(c.fecha_alta, 'DD-MM-YYYY') fecha_alta,
                TO_CHAR(c.fecha_modificacion, 'DD-MM-YYYY') fecha_modificacion,
                c.estatus
                
                from conctra_contrato c 
                inner join conccore_solicitud s on s.id_expediente = c.id_expediente and s.dependencia_conciliadora = c.dependencia_conciliadora
                inner join conccat_generico cgl on cgl.id          = c.id_ley
                inner join conccat_generico cgm on cgm.id          = c.id_materia
                inner join conccat_generico cgn on cgn.id          = c.id_moneda
                where c.id_expediente = $1
                and c.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                and s.estatus = 'A'
                and c.estatus = 'A';`;
                
                const values = [args.id_expediente];
                return db
                .manyOrNone(query, values)
                .then(res => res)
                .catch(err => err)
            })

        },
        Convenio_Modificatorio:{
            type: new GraphQLList(new GraphQLNonNull(Convenio_Modificatorio)),
            args: { id_expediente: { type: GraphQLString } , dependencia_conciliadora: { type: GraphQLInt} },
            resolve: authenticated((parentValue, args, context) => {
                const query = `select 
                    co.id_expediente, 
                    co.numero_contrato, 
                    co.numero_modificatorio, 
                    co.id_tipo, 
                    cgti.descripcion tipo,
                    TO_CHAR(co.vigenciainicio, 'DD-MM-YYYY') vigenciainicio, 
                    TO_CHAR(co.vigenciafin, 'DD-MM-YYYY') vigenciafin, 
                    co.monto, 
                    co.tipo_monto, 
                    co.usuario,  
                    TO_CHAR(co.fecha_alta, 'DD-MM-YYYY') fecha_alta, 
                    TO_CHAR(co.fecha_modificacion, 'DD-MM-YYYY') fecha_modificacion, 
                    co.estatus

                    from conctra_convenio co
                    inner join (select 
                    c.id_contrato, 
                    c.id_expediente, 
                    c.numero_contrato, 
                    c.objeto_contrato, 
                    c.id_ley, 
                    cgl.descripcion ley, 
                    c.id_materia, 
                    cgm.descripcion materia, 
                    c.monto_contrato, 
                    c.monto_reclamacion, 
                    c.id_moneda, 
                    cgn.descripcion moneda, 
                    TO_CHAR(c.vigenciainicio, 'DD-MM-YYYYD') vigenciainicio,
                    TO_CHAR(c.vigenciafin, 'DD-MM-YYYY') vigenciafin,
                    TO_CHAR(c.plazoinicio, 'DD-MM-YYYY') plazoinicio,
                    TO_CHAR(c.plazofin, 'DD-MM-YYYY') plazofin,
                    c.usuario, 
                    TO_CHAR(c.fecha_alta, 'DD-MM-YYYY') fecha_alta,
                    TO_CHAR(c.fecha_modificacion, 'DD-MM-YYYY') fecha_modificacion,
                    c.estatus

                    from conctra_contrato c 
                    inner join conccore_solicitud s on s.id_expediente = c.id_expediente and s.dependencia_conciliadora = c.dependencia_conciliadora
                    inner join conccat_generico cgl on cgl.id          = c.id_ley
                    inner join conccat_generico cgm on cgm.id          = c.id_materia
                    inner join conccat_generico cgn on cgn.id          = c.id_moneda
                    where c.id_expediente = $1
                    and c.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                    and s.estatus = 'A'
                    and c.estatus = 'A') as cto on co.id_expediente   = cto.id_expediente
                    and                            co.numero_contrato = cto.numero_contrato
                    inner join conccat_generico cgti on cgti.id = co.id_tipo
                    where co.estatus = 'A';`;

                const values = [args.id_expediente];
                return db
                .manyOrNone(query, values)
                .then(res => res)
                .catch(err => err)

            })

        },
        Complemento:{
            type: new GraphQLList(new GraphQLNonNull(Complemento)),
            args: { id_expediente: { type: GraphQLString }, dependencia_conciliadora: { type: GraphQLInt}},
            resolve: authenticated((parentValue, args, context) => {
                const query = `select

                    c.id_expediente, 
                    c.id_asunto, 
                    cga.descripcion asunto, 
                    TO_CHAR(c.fecha_recepcion, 'DD-MM-YYYY') fecha_recepcion,
                    c.id_procedimiento, 
                    cgp.descripcion procedimiento, 
                    c.numero, 
                    c.monto_total, 
                    c.usuario, 
                    TO_CHAR(c.fecha_alta, 'DD-MM-YYYY') fecha_alta,
                    TO_CHAR(c.fecha_modificacion, 'DD-MM-YYYY') fecha_modificacion,
                    c.estatus
                
                    from conctra_complemento c
                    inner join conccore_solicitud s on c.id_expediente = s.id_expediente and s.dependencia_conciliadora = c.dependencia_conciliadora
                    inner join conccat_generico cga on c.id_asunto = cga.id
                    inner join conccat_generico cgp on c.id_procedimiento = cgp.id
                    where c.id_expediente = $1
                    and c.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                    and s.estatus  = 'A'
                    and c.estatus  = 'A';`;

                const values = [args.id_expediente];
                return db
                .manyOrNone(query, values)
                .then(res => res)
                .catch(err => err)                        
            })            
        },
        Turnar_Director:{
            type: new GraphQLList(new GraphQLNonNull(Turnar_Director)),
            args: { id_expediente: { type: GraphQLString }, dependencia_conciliadora: { type: GraphQLInt}},
            resolve: authenticated((parentValue, args, context) => {
                const query = `select 
                    t.id_turnar_dir, 
                    t.id_expediente, 
                    t.instruccion, 
                    TO_CHAR(t.fecha_turno, 'DD-MM-YYYY') fecha_turno,
                    t.id_director, 
                    cgd.descripcion director, 
                    t.usuario, 
                    TO_CHAR(t.fecha_alta, 'DD-MM-YYYY') fecha_alta,
                    TO_CHAR(t.fecha_modificacion, 'DD-MM-YYYY') fecha_modificacion,
                    t.estatus
                    from conctra_turnar_director t
                    inner join conccore_solicitud s on s.id_expediente = t.id_expediente and s.dependencia_conciliadora = t.dependencia_conciliadora
                    inner join conccat_generico cgd on cgd.id          = t.id_director
                    where t.id_expediente = $1
                    and t.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                    and s.estatus = 'A'
                    and t.estatus = 'A';`;

                const values = [args.id_expediente];
                return db
                .manyOrNone(query, values)
                .then(res => res)
                .catch(err => err) 
            })
        },
        Turnar_Conciliador:{
            type: new GraphQLList(new GraphQLNonNull(Turnar_Conciliador)),
            args: { id_expediente: { type: GraphQLString }, dependencia_conciliadora: { type: GraphQLInt}},
            resolve: authenticated((parentValue, args, context) => {
                const query = `select 

                    tc.id_turnar_conc, 
                    tc.id_expediente, 
                    tc.instruccion, 
                    TO_CHAR(tc.fecha_turno, 'DD-MM-YYYY') fecha_turno,
                    tc.id_conciliador,
                    cgc.descripcion conciliador, 
                    tc.usuario, 
                    TO_CHAR(tc.fecha_alta, 'DD-MM-YYYY') fecha_alta,
                    TO_CHAR(tc.fecha_modificacion, 'DD-MM-YYYY') fecha_modificacion,
                    tc.estatus

                    from conctra_turnar_conciliador tc
                    inner join conccore_solicitud s on tc.id_expediente = s.id_expediente and tc.dependencia_conciliadora = s.dependencia_conciliadora
                    inner join conccat_generico cgc on tc.id_conciliador = cgc.id
                    where tc.id_expediente = $1
                    and tc.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                    and s.estatus  = 'A'
                    and tc.estatus = 'A';`;

                const values = [args.id_expediente];
                return db
                .manyOrNone(query, values)
                .then(res => res)
                .catch(err => err)                        
            })            
        },
        Admision:{
            type: new GraphQLList(new GraphQLNonNull(Admision)),
            args: { id_expediente: { type: GraphQLString }, dependencia_conciliadora: { type: GraphQLInt}},
            resolve: authenticated((parentValue, args, context) => {
                const query = `select 
                    a.id_expediente, 
                    a.id_acuerdo, 
                    cga.descripcion acuerdo, 
                    TO_CHAR(a.fecha_acuerdo, 'DD-MM-YYYY') fecha_acuerdo,
                    a.causas, 
                    TO_CHAR(a.fecha_notificacion, 'DD-MM-YYYY') fecha_notificacion,
                    TO_CHAR(a.fecha_cumplimiento, 'DD-MM-YYYY') fecha_cumplimiento,
                    
                    case a.cumplio when 1 then 'Si' when 0 then 'No' end cumplio
                    from conctra_admision a
                    inner join conccore_solicitud  s on s.id_expediente = a.id_expediente and s.dependencia_conciliadora = a.dependencia_conciliadora
                    left join conccat_generico   cga on a.id_acuerdo    = cga.id
                    where a.id_expediente = $1
                    and a.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                    and s.estatus = 'A'
                    and a.estatus = 'A';`;

                const values = [args.id_expediente];
                return db
                .manyOrNone(query, values)
                .then(res => res)
                .catch(err => err) 
            })
        },
        Audiencia_Acuerdo:{
            type: new GraphQLList(new GraphQLNonNull(Audiencia_Acuerdo)),
            args: { id_expediente: { type: GraphQLString }, dependencia_conciliadora: { type: GraphQLInt}},
            resolve: authenticated((parentValue, args, context) => {
                const query = `select 
                    a.id_audiencia, 
                    a.id_expediente, 
                    TO_CHAR(a.fecha, 'DD-MM-YYYY') fecha,
                    a.horario, 
                    a.lugar, 
                    a.usuario,
                    TO_CHAR(a.fecha_alta, 'DD-MM-YYYY') fecha_alta,
                    TO_CHAR(a.fecha_modificacion, 'DD-MM-YYYY') fecha_modificacion,
                    a.estatus, 
                    ac.id_acuerdo ac_id_acuerdo,
                    cga.descripcion ac_acuerdo_audi,
                    ac.causas ac_causas, 
                    ac.esuncp ac_esuncp, 
                    ac.descripcionuncp ac_descripcionuncp, 
                    ac.usuario ac_usuario, 
                    ac.fecha_alta ac_fecha_alta,
                    ac.fecha_modificacion ac_fecha_modificacion,
                    ac.estatus ac_estatus

                    from conctra_audiencia a
                    inner join conccore_solicitud  s on   s.id_expediente    = a.id_expediente and s.dependencia_conciliadora = a.dependencia_conciliadora
                    left join conctra_acuerdo     ac on   a.id_expediente    = ac.id_expediente
                    and                                   ac.id_audiencia    = a.id_audiencia
                    left join conccat_generico   cga on   ac.id_acuerdo_audi = cga.id
                    where a.id_expediente = $1
                    and a.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                    and s.estatus = 'A'
                    and a.estatus = 'A';`;
                    
                const values = [args.id_expediente];
                return db
                .manyOrNone(query, values)
                .then(res => res)
                .catch(err => err)
            })
        },
        Conclusion:{
            type: new GraphQLList(new GraphQLNonNull(Conclusion)),
            args: { id_expediente: { type: GraphQLString }, dependencia_conciliadora: { type: GraphQLInt}},
            resolve: authenticated((parentValue, args, context) => {
                const query = `select 
                    c.id_expediente, 
                    TO_CHAR(c.fecha, 'DD-MM-YYYY') fecha,
                    cgs.descripcion sentido, 
                    c.tpc, 
                    c.monto,                     
                    --c.acuerdo, 
                    c.beneficio, 
                    --cga.descripcion acuerdo_descripcion,
                    c.usuario, 
                    TO_CHAR(c.fecha_alta, 'DD-MM-YYYY') fecha_alta,
                    TO_CHAR(c.fecha_modificacion, 'DD-MM-YYYY') fecha_modificacion,
                    c.estatus
                    from conctra_conclusion c                   
                    inner join conccore_solicitud s on s.id_expediente = c.id_expediente and s.dependencia_conciliadora = c.dependencia_conciliadora
                    inner join conccat_generico cgs on c.id_sentido = cgs.id
                    --inner join conccat_proceso cga on cga.id_proceso = cast(c.acuerdo as int)
                    where c.id_expediente = $1
                    and s.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                    and c.estatus = 'A'
                    and s.estatus = 'A';`;

                const values = [args.id_expediente];
                return db
                .manyOrNone(query, values)
                .then(res => res)
                .catch(err => err)                        
            })            
        },
        Observaciones:{
            type: new GraphQLList(new GraphQLNonNull(Observaciones)),
            args: { id_expediente: { type: GraphQLString }, dependencia_conciliadora: { type: GraphQLInt}},
            resolve: authenticated((parentValue, args, context) => {
                const query = `select 
                    o.id_expediente, 
                    p.descripcion proceso,
                    o.usuario, 
                    TO_CHAR(o.fecha_alta, 'DD-MM-YYYY') fecha_alta,
                    TO_CHAR(o.fecha_modificacion, 'DD-MM-YYYY') fecha_modificacion,
                    o.estatus
                    
                    from conctra_observaciones o
                    inner join conccore_solicitud s on s.id_expediente = o.id_expediente and s.dependencia_conciliadora = o.dependencia_conciliadora
                    inner join conccat_proceso    p on p.id_proceso = cast(o.id_proceso as integer)
                    where o.id_expediente = $1
                    and o.dependencia_conciliadora = '${args.dependencia_conciliadora}'
                    and s.estatus = 'A'
                    and o.estatus = 'A';`;

                const values = [args.id_expediente];
                return db
                .manyOrNone(query, values)
                .then(res => res)
                .catch(err => err)                        
            })            
        },
        ObtenerMotivos:{
            type: new GraphQLList(new GraphQLNonNull(generico)),
            args: { motivos: { type: GraphQLString } },
            resolve: authenticated ( async (parentValue, args, context) => {
                                                
                const query = `select li.descripcion                    
                    from conccat_generico li 
                    where li.id in (${args.motivos})`;                    

                return await db
                .manyOrNone(query)
                .then(res => res)
                .catch(err => err)                                                    
            })            
        },
   })
});

module.exports = {
   query
 };