const e = require('express')
const mysql = require('../mysqlConfiguration')

module.exports = class OtherData {
    static fetchCurrentPeriod(){
        return mysql.query('SELECT p.periodo FROM reconheserGS.a_periodoAno p WHERE p.atual = 1')
    }
    static fetchPeriodsToShow(){
        return mysql.query('SELECT p.periodo FROM reconheserGS.a_periodoAno p WHERE p.usados = 1')
    }
    static fetchAvaliadores(){
        return mysql.query('SELECT eaa.matricula FROM reconheserGS.efic_avaliadoresAutorizados eaa')
    }
    static async uploadQuiz(data, callback){
        var updated = 0        
        await data.forEach((e,index) => {
            mysql.query(`UPDATE reconheserGS.r_quiz 
                            SET publicada = 1, 
                                qtdePerguntas = ?, 
                                qtdeAcertos = ?, 
                                abonoFerias = ? 
                         WHERE matricula = ? AND nroProva = ? AND periodo = ?`,[e.qtdePerguntas, e.qtdeAcertos, e.abonoFerias === 's' ? 1 : 0, `${e.matricula}`,e.nroProva,e.periodo])
            .then(([data0,metadata0])=>{
                if(data0.affectedRows===1){
                    updated += 1
                }
                if(index===data.length - 1){
                    mysql.query('CALL reconheserGS.create_r_quiz2();CALL reconheserGS.update_f_resultados();')
                    .then(([data1,metadata1])=>{
                        callback({success: `${updated} registro(s) atualizado(s)`})
                    })
                }
            })
            .catch(err => console.log(err))
        });
    }
    static fetchAvaliaEficFerramentas(matriculaAvaliador){
        return mysql.query(`SELECT eaa.matricula,eaa.id_efic_dadosEntregasFerramentas, edef.*, aa.nome as nomeArea, af.nome as nomeDesenvolvedor 
                            FROM reconheserGS.efic_avaliadoresAutorizados eaa       
                            LEFT JOIN reconheserGS.efic_dadosEntregasFerramentas edef ON edef.id = eaa.id_efic_dadosEntregasFerramentas        
                            LEFT JOIN reconheserGS.a_periodoAno apa ON apa.periodo = eaa.id_a_periodoAno         
                            LEFT JOIN reconheserGS.a_areas aa ON aa.id = edef.id_area         
                            LEFT JOIN reconheserGS.a_funcis af ON af.matricula = edef.desenvolvedor          
                            LEFT JOIN reconheserGS.efic_notasAvaliacao ena ON ena.matricula_efic_avaliadoresAutorizados = eaa.matricula AND ena.id_efic_dadosEntregasFerramentas = eaa.id_efic_dadosEntregasFerramentas         
                            WHERE ena.id_efic_dadosEntregasFerramentas IS NULL AND apa.atual  = 1 AND eaa.matricula = ?`,
        [`${matriculaAvaliador}`])
    }
    static postAvaliaEfic(matriculaAvaliador,idFerramentaAvaliada){
        
    }
    static fetchIndicadores(){
        return mysql.query('SELECT rie.* FROM reconheserGS.r_indicadoresEquipe rie LEFT JOIN reconheserGS.a_periodoAno a on a.periodo = rie.id_a_periodoAno WHERE a.atual = 1')
    } 
    static uploadIndicadores(data){
        return mysql.query(`UPDATE reconheserGS.r_indicadoresEquipe t LEFT JOIN reconheserGS.a_periodoAno a  on a.periodo = t.id_a_periodoAno  SET t.atingimento_semestre = ? WHERE a.atual = 1 and t.id_a_mapearIndicadores = 12;CALL reconheserGS.create_r_indicadoresEquipe2();CALL reconheserGS.update_f_resultados();`, [`${data}`])
    }
    static uploadJornadaDeTrabalho(data){
        var ary = []
        data.forEach(r => {
            var ary2 = []
            ary2.push(r.matricula)
            ary2.push(r.periodo)
            ary2.push(r.diaUtil)
            ary2.push(r.data)
            ary2.push(r.situacao)
            ary2.push(r.nomeSituacao)
            ary.push(ary2)
        })
        return mysql.query(`DELETE t.* FROM reconheserGS.r_jornadaTrabalho t WHERE t.id_a_periodoAno = (SELECT f.periodo FROM reconheserGS.a_periodoAno f WHERE f.atual = 1);
                            INSERT INTO reconheserGS.r_jornadaTrabalho (matricula ,id_a_periodoAno,diaUtil ,workDate ,codSituacao ,nomeSituacao ) VALUES ?;
                            CALL reconheserGS.create_r_acessos();
                            CALL reconheserGS.update_f_resultados();
                            `, [ary])
    }
    static avaliaEficPost(matricula,data){
        const idFerramenta = parseInt(data.ferramenta)
        const nota = parseInt(data.nota)
        return mysql.query(`INSERT INTO reconheserGS.efic_notasAvaliacao (id_a_periodoAno,id_efic_dadosEntregasFerramentas , matricula_efic_avaliadoresAutorizados ,nota) 
                        VALUES ((SELECT a.periodo FROM reconheserGS.a_periodoAno a WHERE a.atual =1 ),?, ?, ?);
                        CALL reconheserGS.create_r_efic_notasAvaliaco();
                        CALL reconheserGS.create_r_indicadoresEquipe2();
                        CALL reconheserGS.update_f_resultados();`,
                        [idFerramenta,`${matricula}`,nota])
    }
}