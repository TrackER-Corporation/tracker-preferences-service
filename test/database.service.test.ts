import { describe, expect, it } from "vitest";
import * as mongoDB from 'mongodb';
import { collections, connectToDatabase } from "../db/services/database.service";


describe('connectToDatabase', () => {
    it('should connect to the database and set up the activity collection', async () => {

        // Connect to the database
        await connectToDatabase();

        // Check that the activity collection has been set up
        expect(collections.preference).toBeInstanceOf(mongoDB.Collection);

        // Check that the connection was successful by inserting a new activity
        const preference = {
            _id: new mongoDB.ObjectId("62c17231d9856f996ed649b9"),
            userId: new mongoDB.ObjectId("62bee981e63f093c813b8a09"),
            activityLog: true,
            avatar: '/static/media/Avatar-38.b48130b476d268025429.svg',
            __v: 0,
            notification: true,
            news: true
        };

        const result = await collections.preference?.insertOne(preference);
        expect(result?.acknowledged).toBe(true);

        // Clean up by deleting the test activity
        await collections.preference?.deleteOne({ _id: result?.insertedId });
    });
});