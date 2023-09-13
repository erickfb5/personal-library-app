const { logEvents } = require("../utils/logEvents");

const requestMethods = { GET: "📡 GET", POST: "📝 POST", PUT: "🔄 PUT", DELETE: "❌ DELETE" }

const loggerMiddleware = (req, res, next) => {
  const { method, url, headers: { origin, referer, host }} = req;
  const originOrReferer = origin || referer;
  
  logEvents(`${requestMethods[method]}${url && `\t${url}`}${`\t${originOrReferer || ''}`}${host && `\t${host}`}`, 
  "reqLog.log");

  console.log(`${requestMethods[method]} ${url && `\t${url}`} ${originOrReferer || ''} ${host || ''} `);
next()
};

module.exports = { loggerMiddleware }