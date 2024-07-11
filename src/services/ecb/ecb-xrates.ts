import { parseStringPromise } from 'xml2js';

// Define TypeScript interfaces for the expected structure
interface Cube {
  $: {
    currency: string;
    rate: string;
  };
}

interface TimeCube {
  $: {
    time: string;
  };
  Cube: Cube[];
}

interface Envelope {
  'gesmes:Envelope': {
    Cube: [
      {
        Cube: TimeCube[];
      }
    ];
  };
}

// Parse the XML data

async function parseEcbDailyRatesXml(xmlData: string) {
  const result: Envelope = await parseStringPromise(xmlData).catch((err) => {
    console.error('Failed to parse XML:', err);
  });

  const timeCubes = result['gesmes:Envelope'].Cube[0].Cube;

  /*
  timeCubes.forEach((timeCube) => {
    console.log(`Date: ${timeCube.$.time}`);
    timeCube.Cube.forEach((cube) => {
      console.log(`Currency: ${cube.$.currency}, Rate: ${cube.$.rate}`);
    });
  });
  */
  return {
    date: timeCubes[0].$.time,
    rates: timeCubes[0].Cube.map((cube) => ({
      currency: cube.$.currency,
      rate: cube.$.rate,
    })),
  };
}
export default parseEcbDailyRatesXml;
