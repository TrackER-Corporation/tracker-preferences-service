import { beforeAll, describe, expect, it, vi } from "vitest";
import { createPreference, updatePreference, getPreferenceById, getAvatarById, deleteAvatarByUserId } from "../db/controller/controller";
import { connectToDatabase } from "../db/services/database.service";


interface Response {
    status: number | any
    json: any
    send: any
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

    it('should return ok creating new preference', async () => {
        const req = {
            params: {
                id: "111111111111"
            }
        };
        const res = mockResponse();
        await createPreference(req, res, {});
        expect(res.status).toHaveBeenCalledWith(200);
        //console.log(res.json.calls[0])
    });

    it('should return ok for existing preference', async () => {
        const req = {
            params: {
                id: "111111111111"
            }
        };
        const res = mockResponse();
        await getPreferenceById(req, res, {});
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return error getting for no preference id', async () => {
        const req = {
            params: {
                id: "999999999999"
            }
        };
        const res = mockResponse();
        expect(async () => await getPreferenceById(req, res, {})).rejects.toThrow("Not found");
    });

    it('should return error creating for no preference id', async () => {
        const req = {
            params: {
                id: ""
            }
        };
        const res = mockResponse();
        expect(async () => await getPreferenceById(req, res, {})).rejects.toThrow(/Argument passed in/);
    });

    it('should return error updating for no preference id', async () => {
        const req = {
            params: {
                id: ""
            }
        };
        const res = mockResponse();
        expect(async () => await updatePreference(req, res, {})).rejects.toThrow(/Not found/);
    });

    it('should return error updating for wrong preference id', async () => {
        const req = {
            params: {
                id: "999999999999"
            }
        };
        const res = mockResponse();
        expect(async () => await updatePreference(req, res, {})).rejects.toThrow(/Not found/);
    });

    it('should return ok updating preference', async () => {
        const req = {
            params: {
                id: "111111111111",
                notification: false
            }
        };
        const res = mockResponse();
        await updatePreference(req, res, {});
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return error getting avatar for no preference id', async () => {
        const req = {
            params: {
                id: ""
            }
        };
        const res = mockResponse();
        expect(async () => await getAvatarById(req, res, {})).rejects.toThrow(/Not found/);

    });

    it('should return error getting avatar for wrong preference id', async () => {
        const req = {
            params: {
                id: "999999999999"
            }
        };
        const res = mockResponse();
        expect(async () => await getAvatarById(req, res, {})).rejects.toThrow(/Not found/);
    });

    it('should return ok getting avatar', async () => {
        const req = {
            params: {
                id: "111111111111",
            }
        };
        const res = mockResponse();
        await getAvatarById(req, res, {});
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return error deleting avatar no id', async () => {
        const req = {
            params: {
                id: "",
            }
        };
        const res = mockResponse();
        expect(async () => await deleteAvatarByUserId(req, res, {})).rejects.toThrow(/Not found/);
    });

    it('should return ok deleting avatar', async () => {
        const req = {
            params: {
                id: "111111111111",
            }
        };
        const res = mockResponse();
        await deleteAvatarByUserId(req, res, {});
        expect(res.status).toHaveBeenCalledWith(200);

    });


});