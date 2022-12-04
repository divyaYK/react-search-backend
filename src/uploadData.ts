import * as fs from "fs";
import * as readline from "readline";
import { transform } from "camaro";
import { MainOrLegal, template } from "./modules/schema";
import * as path from "path";
import { IAbr } from "./modules/types";
import axios from "axios";

const xmlDir = path.join(__dirname, "../xml");
async function getXMLFiles() {
  try {
    const allFiles = await fs.promises.readdir(xmlDir);
    return allFiles;
  } catch (err) {
    console.error("Error reading XML Directory", err);
  }
}

(async () => {
  const allFiles = await getXMLFiles();
  if (allFiles !== undefined && allFiles.length !== 0) {
    for (const file of allFiles) {
      if (file.endsWith(".xml")) {
        const readXML = readline.createInterface({
          input: fs.createReadStream(`${xmlDir}/${file}`),
          output: process.stdout,
          terminal: false,
        });

        for await (const line of readXML) {
          if (line !== null && line.trim().length > 0) {
            const fullXML = `<?xml version="1.0"?><Transfer error="none" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="BulkExtract.xsd">${line}</Transfer>`;
            const json = await transform(fullXML, template);
            if (json !== undefined && json.length > 0) {
              const result = json[0];
              const dataObj: IAbr = {
                abn: { ...result.abn },
                entityType: { ...result.entityType },
                entity:
                  result.mainEntity.businessAddress.state === ""
                    ? {
                        entityCategory: MainOrLegal.LEGAL,
                        entityName: {
                          nameType: result.legalEntity.individualName.type,
                          nameTitle:
                            result.legalEntity.individualName.nameTitle,
                          givenName:
                            result.legalEntity.individualName.givenName,
                          familyName:
                            result.legalEntity.individualName.familyName,
                        },
                        businessAddress: {
                          state: result.legalEntity.businessAddress.state,
                          postcode: result.legalEntity.businessAddress.postcode,
                        },
                      }
                    : {
                        entityCategory: MainOrLegal.MAIN,
                        entityName: {
                          nameType: result.mainEntity.nonIndividualName.type,
                          nonIndividualName:
                            result.mainEntity.nonIndividualName.value,
                        },
                        businessAddress: {
                          state: result.mainEntity.businessAddress.state,
                          postcode: result.mainEntity.businessAddress.postcode,
                        },
                      },
                asicNumber: {
                  asicNumberType: result.asicNumber.type,
                  value: result.asicNumber.value,
                },
                otherEntity:
                  result.otherEntity.length > 0
                    ? result.otherEntity.map((item: any) => ({
                        nameType: item.type,
                        value: item.value,
                      }))
                    : [],
                recordLastUpdatedDate: result.recordLastUpdatedDate,
              };
              if (result.gst.status !== "") {
                dataObj.gst = result.gst;
              }
              if (result.dgr.nonIndividualName.type !== "") {
                dataObj.dgr = {
                  nonIndividualName: {
                    nameType: result.dgr.nonIndividualName.type,
                    value: result.dgr.nonIndividualName.value,
                  },
                };
                if (result.dgr.status !== "") {
                  dataObj.dgr.status = result.dgr.status;
                }
                if (result.dgr.statusFromDate !== "") {
                  dataObj.dgr.statusFromDate = result.dgr.statusFromDate;
                }
              }
              try {
                const insertObject = await axios.post(
                  "http://localhost:4502/api/abr",
                  dataObj
                );
              } catch (err) {
                console.error(JSON.stringify(err));
              }
            }
          }
        }
      }
    }
  }
})();
