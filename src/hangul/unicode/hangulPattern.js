const hangulPattern = /[\uac00-\ud7af\u1100-\u11ff\u3130-\u318f\ua960-\ua97f\ud7b0-\ud7ff]+/g

const splitPattern = /([\uac00-\ud7af\u1100-\u11ff\u3130-\u318f\ua960-\ua97f\ud7b0-\ud7ff]+|[^\uac00-\ud7af\u1100-\u11ff\u3130-\u318f\ua960-\ua97f\ud7b0-\ud7ff]+)/

module.exports = { hangulPattern, splitPattern }
