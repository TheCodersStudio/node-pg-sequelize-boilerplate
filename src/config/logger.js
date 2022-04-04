/**
 * Logger: winston logger
 *
 * @author Chetan Patil
 * @version 1.0.0
 */
import { transports, createLogger, format } from 'winston';

const {
  combine, printf, errors,
} = format;

const { NODE_ENV, JSON_LOG = 'false' } = process.env;

const severityLookup = {
  default: 'DEFAULT',
  silly: 'DEFAULT',
  verbose: 'DEBUG',
  debug: 'DEBUG',
  http: 'NOTICE',
  info: 'INFO',
  warn: 'WARNING',
  error: 'ERROR',
};

const setTrasnsport = () => [new transports.Console()];

const getFilename = input => {
  const parts = input.split(/[\\/]/);
  return `${parts[parts.length - 2]}/${parts.pop()}`;
};

/**
   * In this function custom log format is created
   * Here we have defined two formats one is JSON & other SingleLine
   *
   * If "JSON_LOG" from env is set to true then  JSON log is returned
   * else single line
   *
   * @param {string} filename - filename in which log is added
   */

const loggerFormat = filename => printf(({
  // eslint-disable-next-line no-shadow
  timestamp, level, message, stack,
}) => {
  let fName = filename;
  let output = {
    processPID: process.pid,
    level: level.toUpperCase(),
    file: fName,
    message,
    ts: timestamp,
    severity: severityLookup[level] || severityLookup.default,
  };

  if (stack) {
    const frame = (stack.split('\n')[1]).trim().split(' ');
    const stackTrace = {
      function: frame[1],
      line: frame[2].split(':')[2],
      stack,
    };
    // eslint-disable-next-line prefer-destructuring
    fName = `${getFilename(frame[2]).split(':')[0]}-[Line: ${stackTrace.line}]`;
    output = { ...output, ...stackTrace };
  }

  const lChar = level.charAt(0).toUpperCase();
  let singleLineLog = `${timestamp}-[${process.pid}]-${lChar}-${fName}-${message}`;

  if (stack) {
    singleLineLog = `${singleLineLog}- {stack: ${stack}}`;
  }

  return JSON.parse(JSON_LOG.toLowerCase()) ? JSON.stringify(output) : singleLineLog;
});

const Logger = filepath => createLogger({
  format: combine(
    format.colorize({ all: true }),
    format.timestamp(),
    //  format.align(),
    errors({ stack: true }),
    loggerFormat(getFilename(filepath)),
  ),
  silent: (NODE_ENV === 'test'),
  defaultMeta: {
    service: 'my-service',
  },
  transports: setTrasnsport(),
});

export {
  Logger,
};
