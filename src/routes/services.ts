import * as HttpStatus from 'http-status-codes';
import * as express from 'express';
import { Router, Request, Response } from 'express';

import { ServiceModell } from '../models/services';

const serviceModell = new ServiceModell();
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send({ ok: true, message: 'Welcome to Api Server!', code: HttpStatus.OK });
});

router.get('/seq/:date_serve/:hn', async (req: Request, res: Response) => {
    let db = req.db;
    let date_serve: any = req.params.date_serve;
    let hn: any = req.params.hn;

    if (date_serve && hn) {
        try {
            let rs: any = await serviceModell.getSeq(db, date_serve, hn);
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

router.get('/date/:seq', async (req: Request, res: Response) => {
    let db = req.db;
    let vn: any = req.params.seq;

    if (vn) {
        try {
            let rs: any = await serviceModell.getDate(db, vn);
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

router.get('/time/:seq', async (req: Request, res: Response) => {
    let db = req.db;
    let vn: any = req.params.seq;

    if (vn) {
        try {
            let rs: any = await serviceModell.getTime(db, vn);
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

router.get('/department/:seq', async (req: Request, res: Response) => {
    let db = req.db;
    let vn: any = req.params.seq;

    if (vn) {
        try {
            let rs: any = await serviceModell.getDepartment(db, vn);
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

router.get('/screening/:seq', async (req: Request, res: Response) => {
    let db = req.db;
    let vn: any = req.params.seq;

    if (vn) {
        try {
            let rs: any = await serviceModell.getScreening(db, vn);
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