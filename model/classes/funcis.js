const mysql = require('../mysqlConfiguration')

module.exports = class Funci {
    static registerLog(user,userAffected,description){
        return mysql.query('INSERT INTO reconheserGS.a_log (usuario, matriculaAfetada,description) VALUES (?, ?, ?)', [`${user}`,`${userAffected}`,`${description}`])
    }
    static fetchAllFuncis(){
        return mysql.query('SELECT f.* FROM reconheserGS.a_funcis f')
    }
    static findByChave(chave){
        return mysql.query(`SELECT f.* FROM reconheserGS.a_funcis f WHERE f.matricula = ?`, [`${chave}`])
    }
    static acessoByChave(valor,chave){
        return mysql.query('UPDATE reconheserGS.a_funcis SET acesso = ? WHERE matricula = ?', [`${valor}`, `${chave}`])
    }
    static getAcessoByChave(chave){
        return mysql.query('SELECT f.acesso FROM reconheserGS.a_funcis f WHERE f.matricula = ?', [`${chave}`])
    }
    static participanteByChave(valor,chave){
        return mysql.query('UPDATE reconheserGS.a_funcis SET participante = ? WHERE matricula = ?', [`${valor}`, `${chave}`])
    }
    static fetchAllResults(){
        return mysql.query('SELECT r.* FROM reconheserGS.f_resultados r')
    }
    static fetchAllPersonalResults(matricula){
        return mysql.query(`
        SELECT fr.*, t.desafio FROM reconheserGS.f_resultados fr LEFT JOIN reconheserGS.a_desafios t on t.idDesafio = fr.id_a_desafios WHERE fr.matricula = ? AND t.excluido <> 1;
        SELECT rapg.* FROM reconheserGS.r_acessosPortalGs rapg WHERE rapg.chave = ?;
        SELECT 	COUNT(r.matricula ) as diasTrabalhados,	r.id_a_periodoAno ,	r.matricula FROM reconheserGS.r_jornadaTrabalho r WHERE r.diaUtil = 'SIM' AND r.codSituacao NOT IN (331,334,401,403,415,424,425,456,462,483,485) AND r.matricula = ? GROUP BY r.matricula, r.id_a_periodoAno;
        SELECT 	COUNT(r.matricula ) as diasSemTrabalho, r.id_a_periodoAno , r.matricula FROM reconheserGS.r_jornadaTrabalho r WHERE r.diaUtil = 'NAO' AND r.codSituacao IN (331,334,401,403,415,424,425,456,462,483,485)  AND r.matricula = ? GROUP BY r.matricula, r.id_a_periodoAno; 
        SELECT rie.atingimento_semestre as valorIndicador,rie.id_a_periodoAno FROM reconheserGS.r_indicadoresEquipe rie WHERE rie.id_a_mapearIndicadores = (SELECT af.id_indicadorEquipe FROM reconheserGS.a_funcis af WHERE af.matricula = ?);
        SELECT SUM(rc.horas_fip) as horas_fip , SUM(rc.horas_priorizadas) as horas_priorizadas FROM reconheserGS.r_capacitacao rc WHERE rc.matricula = ?;
        SELECT rc.* FROM reconheserGS.r_capacitacao rc WHERE rc.matricula = ?;
        SELECT rq.* FROM reconheserGS.r_quiz rq WHERE rq.matricula = ?;
        SELECT apa.periodo FROM a_periodoAno apa WHERE apa.atual = 1;
        SELECT apa.periodo FROM a_periodoAno apa WHERE apa.usados = 1;
        SELECT t.* FROM reconheserGS.a_funcis t WHERE t.matricula = ?;
        `,[`${matricula}`,`${matricula}`,`${matricula}`,`${matricula}`,`${matricula}`,`${matricula}`,`${matricula}`,`${matricula}`,`${matricula}`])
    }
}