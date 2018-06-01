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

router.get('/view/:hn/:dateServe/:request_id/:register_id', async (req: Request, res: Response) => {
    let db = req.db;
    let hn: any = req.params.hn;
    let dateServe: any = req.params.dateServe;
    let register_id: any = req.params.register_id;
    let request_id: any = req.params.request_id;
    let profile: any = {};
    let hcode: any = '10957';
    let hname: any = 'โรงพยาบาลตาลสุม';
    // let register_id: any = '3333';
    // let request_id: any = '2222';

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

            // let obj_bloodgrp: any = {};
            // obj_bloodgrp.blood_group = rs_bloodgrp[0].bloodgrp;

            let obj_allergy: any = [];
            obj_allergy.allergy = rs_allergy;

            let obj_disease: any = [];
            obj_disease.disease = rs_disease;

            let objProfile: any = {};
            objProfile.name = obj_name;
            objProfile.blood_group = rs_bloodgrp[0].bloodgrp;
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
            let anc: any;

            for (let item of rs[0]) {

                let objService: any = {};
                let objActivities: any = {};
                let objPp: any = {};
                let anc_obj: any;
                objService.date_serve = item.date;
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
                // let refer: any[] = await activitiesModell.getRefer(db, item.seq);
                objActivities.refer = await activitiesModell.getRefer(db, item.seq);
                let appointment: any[] = await activitiesModell.getAppointment(db, item.seq);
                objActivities.appointment = appointment;
                let lab: any[] = await activitiesModell.getLabs(db, item.seq);
                objActivities.lab = lab[0];

                // pp
                anc = await activitiesModell.getAnc(db, item.seq);
                objPp.anc = anc[0][0];

                let vacine: any[] = await activitiesModell.getVacine(db, item.seq);
                objPp.vacine = vacine[0];

                pp.push(objPp); // add objPp to pp
                objActivities.pp = pp[0] // add pp to objActivities

                activities.push(objActivities);
                objService.activities = activities;

                services.push(objService);

            }

            if (rs_name.length) {
                res.send({
                    ok: true,
                    hcode: hcode,
                    hname: hname,
                    hn: req.params.hn,
                    register_id: register_id,
                    request_id: request_id,
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


export default router;