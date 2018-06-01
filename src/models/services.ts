import * as Knex from 'knex';

export class ServiceModell {

    getSeq(db: Knex, date_serve: any, hn: any) {

        let sql = `select o.vn as seq ,o.vstdttm as date ,o.nrxtime as time,c.namecln as department
        from ovst as o
        inner join cln as c on c.cln = o.cln 
        where DATE(o.vstdttm) = ? and o.hn = ?`;
        return db.raw(sql, [date_serve, hn]);
    }

    getDate(db: Knex, vn: any) {
        return db('ovst as o')
            .select('o.vstdttm as date')
            .where('vn', vn);
    }

    getTime(db: Knex, vn: any) {
        return db('ovst as o')
            .select('o.nrxtime as time')
            .where('vn', vn);
    }

    getDepartment(db: Knex, vn: any) {
        return db('ovst as o')
            .select('c.namecln as department')
            .innerJoin('cln as c', 'c.cln', '=', 'o.cln')
            .where('vn', vn);
    }

    getScreening(db: Knex, vn: any) {
        return db('ovst as o')
            .select('o.bw as weigth', 'o.bw as height', 'o.dbp as dbp', 'o.sbp as sbp', 'o.bmi as bmi')
            .where('vn', vn);
    }


}