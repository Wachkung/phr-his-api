import * as Knex from 'knex';

export class OfficeModell {

    getHospital(db: Knex) {
        return db('setup as s')
            .select('s.hcode as hcode')
    }
}