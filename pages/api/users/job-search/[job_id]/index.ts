import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next';
import { delFavJob, findUser } from '../../../../../db/db';
import { authOptions } from '../../../auth/[...nextauth]';


interface PageQ {
    job_id: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    const email = session?.user?.email;
    const query = req.query as unknown as PageQ;
    if (req.method === 'DELETE') {

        const findEmail = await findUser(email!)
        if (findEmail) {
            await delFavJob(email!, query.job_id);
            res.status(204).end();

        }
        else {
            res.status(401).json('Not authorized');
        }
    }
};