import * as HttpStatus from 'http-status-codes';
import * as express from 'express';
import { Router, Request, Response } from 'express';

import { ProfileModell } from '../models/profile';
import { ServiceModell } from '../models/services';
import { ActivitiesModell } from '../models/activities';

const profileModell = new ProfileModell();
const serviceModell = new ServiceModell();
const activitiesModell = new ActivitiesModell();
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send({ ok: true, message: 'Welcome to Api Server!', code: HttpStatus.OK });
});

router.get('/view/:hn/:dateServe', async (req: Request, res: Response) => {
    let db = req.db;
    let hn: any = req.params.hn;
    let dateServe: any = req.params.dateServe;
    let profile: any = {};
    let hcode: any = '10957';
    let register_id: any = '3333';

    if (hn) {
        try {
            let rs_name: any = await profileModell.getPtDetail(db, hn);
            let rs_bloodgrp: any = await profileModell.getBloodgrp(db, hn);
            let rs_allergy: any = await profileModell.getAllergyDetail(db, hn);
            let rs_disease: any = await profileModell.getDisease(db, hn);

            let obj_name: any = {};
            obj_name.title_name = rs_name[0].title_name;
            obj_name.first_name = rs_name[0].first_name;
            obj_name.last_name = rs_name[0].last_name;

            let obj_bloodgrp: any = {};
            obj_bloodgrp.blood_group = rs_bloodgrp[0].bloodgrp;

            let obj_allergy: any = [];
            obj_allergy.allergy = rs_allergy;

            let obj_disease: any = [];
            obj_disease.disease = rs_disease;

            let objProfile: any = {};
            objProfile.name = obj_name;
            objProfile.bloodgrp = obj_bloodgrp;
            objProfile.allergy = obj_allergy;
            objProfile.disease = obj_disease;


            let rs: any = await serviceModell.getSeq(db, dateServe, hn);

            let screenings: any = [];
            // obj_screening.screening = rs_screening;
            // console.log(rs[0]);

            let services: any = [];
            let activities: any = [];
            let pp: any = [];
            // obj_screening.screening = rs_screening;

            for (let item of rs[0]) {

                let objService: any = {};
                let objActivities: any = {};
                let objPp: any = {};
                objService.date_serv = item.date;
                objService.time_serve = item.time;
                objService.clinic = item.department;
                objService.seq = item.seq;
                // screening
                objService.screening = await serviceModell.getScreening(db, item.seq);

                // activities
                objActivities.pe = await activitiesModell.getPe(db, item.seq);
                objActivities.diagnosis = await activitiesModell.getDiagnosis(db, item.seq);
                let drugs: any[] = await activitiesModell.getDrugs(db, item.seq);
                objActivities.drugs = drugs[0];
                let refer: any[] = await activitiesModell.getRefer(db, item.seq);
                objActivities.refer = refer[0];
                let appointment: any[] = await activitiesModell.getAppointment(db, item.seq);
                objActivities.appointment = appointment[0];
                let lab: any[] = await activitiesModell.getLabs(db, item.seq);
                objActivities.lab = lab[0];

                // pp
                let anc: any[] = await activitiesModell.getAnc(db, item.seq);
                objPp.anc = anc[0];
                let vacine: any[] = await activitiesModell.getVacine(db, item.seq);
                objPp.vacine = vacine[0];

                pp.push(objPp); // add objPp to pp
                objActivities.pp = pp // add pp to objActivities

                activities.push(objActivities);
                objService.activities = activities;

                services.push(objService);

            }

            if (rs_name.length) {
                res.send({
                    ok: true,
                    hcode: req.params.hcode,
                    hn: req.params.hn,
                    register_id: req.params.register_id,
                    // name: obj_name,
                    // allergy: rs_allergy,
                    // disease: rs_disease,
                    // blood_group: obj_bloodgrp,
                    profile: objProfile,
                    services: services,
                    code: HttpStatus.OK
                });
            }
            else {
                res.send({ ok: true, info: {}, code: HttpStatus.OK });
            }
        } catch (error) {
            res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
        }
    } else {
        res.send({ ok: false, error: 'Incorrect data!', code: HttpStatus.OK });
    }
});



router.get('/name/:hn', async (req: Request, res: Response) => {
    let db = req.db;
    let hn: any = req.params.hn;

    if (hn) {
        try {
            let rs: any = await profileModell.getPtDetail(db, hn);
            if (rs.length) {
                res.send({ ok: true, info: rs[0], code: HttpStatus.OK });
            } else {
                res.send({ ok: true, info: {}, code: HttpStatus.OK });
            }
        } catch (error) {
            res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
        }
    } else {
        res.send({ ok: false, error: 'Incorrect data!', code: HttpStatus.OK });
    }
});

router.get('/allergy/:hn', async (req: Request, res: Response) => {
    let db = req.db;
    let hn: any = req.params.hn;

    if (hn) {
        try {
            let rs: any = await profileModell.getAllergyDetail(db, hn);
            if (rs.length) {
                res.send({ ok: true, info: rs, code: HttpStatus.OK });
            } else {
                res.send({ ok: true, info: {}, code: HttpStatus.OK });
            }
        } catch (error) {
            res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
        }
    } else {
        res.send({ ok: false, error: 'Incorrect data!', code: HttpStatus.OK });
    }
});

router.get('/blood_group/:hn', async (req: Request, res: Response) => {
    let db = req.db;
    let hn: any = req.params.hn;

    if (hn) {
        try {
            let rs: any = await profileModell.getBloodgrp(db, hn);
            if (rs.length) {
                res.send({ ok: true, info: rs[0], code: HttpStatus.OK });
            } else {
                res.send({ ok: true, info: {}, code: HttpStatus.OK });
            }
        } catch (error) {
            res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
        }
    } else {
        res.send({ ok: false, error: 'Incorrect data!', code: HttpStatus.OK });
    }
});

router.get('/sex/:hn', async (req: Request, res: Response) => {
    let db = req.db;
    let hn: any = req.params.hn;

    if (hn) {
        try {
            let rs: any = await profileModell.getSex(db, hn);
            if (rs.length) {
                res.send({ ok: true, info: rs[0], code: HttpStatus.OK });
            } else {
                res.send({ ok: true, info: {}, code: HttpStatus.OK });
            }
        } catch (error) {
            res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
        }
    } else {
        res.send({ ok: false, error: 'Incorrect data!', code: HttpStatus.OK });
    }
});

router.get('/disease/:hn', async (req: Request, res: Response) => {
    let db = req.db;
    let hn: any = req.params.hn;

    if (hn) {
        try {
            let rs: any = await profileModell.getDisease(db, hn);
            if (rs.length) {
                res.send({ ok: true, info: rs, code: HttpStatus.OK });
            } else {
                res.send({ ok: true, info: {}, code: HttpStatus.OK });
            }
        } catch (error) {
            res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
        }
    } else {
        res.send({ ok: false, error: 'Incorrect data!', code: HttpStatus.OK });
    }
});

export default router;