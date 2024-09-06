const { GridFSBucket } = require("mongodb");

let bucket;

const initBucket = (db) => {
    try {
        bucket = new GridFSBucket(db, {
            bucketName: "files-buckket", // Customize the bucket name if needed
        });
        console.log("Buket GridFS initialized!");
        return bucket;
    } catch (e) {
        console.log("Buket GridFS failed!");
        return;
    }
};

const getBuckket = async () => {
    if (!bucket) {
        return initBucket();
    }

    return bucket;
};

module.exports = { initBucket, getBuckket };
