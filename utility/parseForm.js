function formParser (req, res, next) {
    const method = req.method;
    if (method === 'POST' && req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        console.log();
        const bufferBody = [];
        req.on('data', chunk => {
            bufferBody.push(chunk);
        });
        req.on('end', () => {
            try {
                const buffer = Buffer.concat(bufferBody);
                const text = buffer.toString('utf8');
                req.parsedText = text;
            } catch (err) {
                console.error("Error parsing text", err);
                res.status(400).send("Invalid TEXT in request body"); 
                return; 
            }

            next();
        })
    } else {
        next();
    }
}

module.exports = formParser;