import { beforeAll, describe, expect, it, vi } from "vitest";
import { createPreference, updatePreference, getPreferenceById, getAvatarById} from "../db/controller/controller";
import { ObjectId } from "mongodb";
import { collections, connectToDatabase } from "../db/services/database.service";


interface Response {
    status: number | any
    json: any
}

describe('Activity controller', async () => {
    beforeAll(async () => {
        await connectToDatabase()
        vi.clearAllMocks();
    });
    const mockResponse = () => {
        const res: Response = {
            json: {},
            status: {}
        };
        res.status = vi.fn().mockReturnValue(res);
        res.json = vi.fn().mockReturnValue(res);
        return res;
    };

    beforeAll(() => {
        vi.clearAllMocks();
    });

    it('should return ok for existing preference', async () => {
        const req = {
            params: {
                id: "62bee981e63f093c813b8a02"
            }
        };
        const res = mockResponse();
        await getPreferenceById(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return error getting for no preference id', async () => {
        const req = {
            params: {
                id: "111111111111"
            }
        };
        const res = mockResponse();
        await getPreferenceById(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should return error creating for no preference id', async () => {
        const req = {
            params: {
                id: ""
            }
        };
        const res = mockResponse();
        await createPreference(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return ok creating new preference', async () => {
        const req = {
            params: {
                id: "111111111111"
            }
        };
        const res = mockResponse();
        await createPreference(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return error updating for no preference id', async () => {
        const req = {
            params: {
                id: ""
            }
        };
        const res = mockResponse();
        await updatePreference(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return error updating for wrong preference id', async () => {
        const req = {
            params: {
                id: "999999999999"
            }
        };
        const res = mockResponse();
        await updatePreference(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
    });

    it('should return ok updating preference', async () => {
        const req = {
            params: {
                id: "111111111111",
                notification: false
            }
        };
        const res = mockResponse();
        await updatePreference(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return error getting avatar for no preference id', async () => {
        const req = {
            params: {
                id: ""
            }
        };
        const res = mockResponse();
        await getAvatarById(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return error getting avatar for wrong preference id', async () => {
        const req = {
            params: {
                id: "999999999999"
            }
        };
        const res = mockResponse();
        await getAvatarById(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
    });

    it('should return ok getting avatar', async () => {
        const req = {
            params: {
                id: "111111111111",
            }
        };
        const res = mockResponse();
        await getAvatarById(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        await collections.preference?.deleteOne({ userId: new ObjectId("111111111111") });
    });

});