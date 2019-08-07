export const encodePermalink = data => {
    const o = JSON.stringify(data);
    const location = window.location.protocol + "//" + window.location.host + "/svg/";
    return location + Buffer.from(o).toString("base64");
};

export const decodePermalink = data => {
    if (!data) return {};
    const decoded = (new Buffer(data, "base64")).toString("ascii");
    return JSON.parse(decoded);
};
