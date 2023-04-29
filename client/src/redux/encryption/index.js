var CryptoJS = require("crypto-js");

const TempKey = "U2FsdGVkX195ADQ2bdeLAmoNyDc7aPU/9wN14qnkc8gYIHdd0xtU8NRfMlpQLR2sXEpykh4bWYM8PePc1+29vuC9maWGy1LoAVm4rVZPPTwqS9AOdBq7ol5hXA22nJ9C";

function backupDecyption(data) {
    const Securitykey = "W�;\u0000��\"�| �a�4~�i[���`Ľ�\u001c�>>\t\u001d";
    return decrypt(TempKey, Securitykey);
};

function getEncryptionKey() {
    const encryptionKey = "U2FsdGVkX1/NcasjRRLHbg7HveEGx6h4ees37v1QeMZWs5Pv0NmjnM6e0mEqBf+gbr26gdXtHfJq36RkNzX38wyBl06+asaoxdbagEuAN1w=";
    return decrypt(encryptionKey, backupDecyption(TempKey));
};

export function encrypt(data) {
    const encryptionKey = getEncryptionKey();
    return CryptoJS.AES.encrypt(data, encryptionKey).toString();
};

export function decrypt(data, encryptionKey) {
    if (encryptionKey === undefined) {
        const encryptionKey = getEncryptionKey();
        try {
            var bytes = CryptoJS.AES.decrypt(data, encryptionKey);
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (TypeError) {
            return null;
        };
    } else {
        var bytes = CryptoJS.AES.decrypt(data, encryptionKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    };
};