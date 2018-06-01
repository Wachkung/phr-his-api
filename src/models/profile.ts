import * as Knex from 'knex';

export class ProfileModell {

    getPtDetail(db: Knex, hn: any) {
        return db('pt')
            .select('pop_id as cid', 'pname as title_name', 'fname as first_name', 'lname as last_name')
            .where('hn', hn);
    }

    getAllergyDetail(db: Knex, hn: any) {
        return db('allergy')
            .select('namedrug', 'detail')
            .where('hn', hn);
    }

    getBloodgrp(db: Knex, hn: any) {
        return db('pt')
            .select('bloodgrp')
            .where('hn', hn);
    }
    getSex(db: Knex, hn: any) {
        return db('pt')
            .select('male')
            .where('hn', hn);
    }

    getDisease(db: Knex, hn: any) {
        return db('chronic as c')
            .select('c.chronic as ICD10_code', 'i.name_t as ICD10_desc')
            .innerJoin('icd101 as i', 'i.icd10', '=', 'c.chronic')
            .where('c.pid', hn);
    }

}