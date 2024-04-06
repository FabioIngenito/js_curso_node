import pino from 'pino';

const username = 'FabioI'; // get this property from req.user in an Express handler function

const levels = {
  notice: 35, // Any number between info (30) and warn (40) will work the same
  catastrophe: 70,
};

const pinoCustom = {
  customLevels: levels,
  formatters: {
    level: (label, number) => {
      return { level: `${number} - ${label.toUpperCase()}` };
    },
  },
};

const transport = pino.transport({
  target: 'pino/file',
  options: {
    destination: './PINO/logPino.json',
    mkdir: true,
  },
});

export const logger = pino(pinoCustom, transport).child({ username: username });
