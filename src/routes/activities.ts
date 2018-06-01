import * as HttpStatus from 'http-status-codes';
import * as express from 'express';
import { Router, Request, Response } from 'express';

import { ActivitiesModell } from '../models/activities';

const activitiesModell = new ActivitiesModell();
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send({ ok: true, message: 'Welcome to Api Server!', code: HttpStatus.OK });
});

router.get('/pe/:seq', async (req: Request, res: Response) => {
    let db = req.db;
    let vn: any = req.params.seq;

    if (vn) {
        try {
            let rs: any = await activitiesModell.getPe(db, vn);
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

router.get('/diagnosis/:seq', async (req: Request, res: Response) => {
    let db = req.db;
    let vn: any = req.params.seq;

    if (vn) {
        try {
            let rs: any = await activitiesModell.getDiagnosis(db, vn);
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

router.get('/drugs/:seq', async (req: Request, res: Response) => {
    let db = req.db;
    let vn: any = req.params.seq;

    if (vn) {
        try {
            let rs: any = await activitiesModell.getDrugs(db, vn);
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

router.get('/refer/:seq', async (req: Request, res: Response) => {
    let db = req.db;
    let vn: any = req.params.seq;

    if (vn) {
        try {
            let rs: any = await activitiesModell.getRefer(db, vn);
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

router.get('/appointment/:seq', async (req: Request, res: Response) => {
    let db = req.db;
    let vn: any = req.params.seq;

    if (vn) {
        try {
            let rs: any = await activitiesModell.getAppointment(db, vn);
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

router.get('/anc/:seq', async (req: Request, res: Response) => {
    let db = req.db;
    let vn: any = req.params.seq;

    if (vn) {
        try {
            let rs: any = await activitiesModell.getAnc(db, vn);
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

router.get('/vacine/:seq', async (req: Request, res: Response) => {
    let db = req.db;
    let vn: any = req.params.seq;

    if (vn) {
        try {
            let rs: any = await activitiesModell.getVacine(db, vn);
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

router.get('/lab/:seq', async (req: Request, res: Response) => {
    let db = req.db;
    let vn: any = req.params.seq;

    if (vn) {
        try {
            let rs: any = await activitiesModell.getLabs(db, vn);
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

router.get('/lab_table/:ln/:lab_name', async (req: Request, res: Response) => {
    let db = req.db;
    let ln: any = req.params.ln;
    let lab_name: any = req.params.lab_name;

    if (ln) {
        try {
            let rs: any = await activitiesModell.getLabTable(db, lab_name, ln);
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


export default router;