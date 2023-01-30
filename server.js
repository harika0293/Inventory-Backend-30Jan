const express = require("express");
const app = express();
const cors = require("cors");
const { json } = require("express/lib/response");
const request = require("request").defaults({ rejectUnauthorized: false });
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 9004;

app.use(cors());

app.use(express.json());

const bodyParser = require("body-parser");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, "0.0.0.0", () => {
  console.log(`server started on port 9004`);
});

app.post("/api/ProductionOrderFilters", (req, res) => {
  // const email = req.body.email;
  // const pwd = req.body.pwd;
  // console.log("req.body", req.body);

  // const fromDateOne = req.body.fromDateOne;
  // const toDateTwo = req.body.toDateTwo;
  // let status = req.body.status;
  // let warehouse = req.body.warehouse;
  // let series = req.body.series;
  // let docNum = req.body.docNum;

  // if (status === "" || "Planned" || "Received") {
  //   status = "string";
  // }
  // if (warehouse === "") {
  //   warehouse = "string";
  // }
  // if (series === "") {
  //   series = 0;
  // }
  // if (docNum === "") {
  //   docNum = 0;
  // }

  // res.send(email + " : " + pwd);
  // res.redirect('https://192.168.1.101:50000/b1s/v1/Login');

  // console.log("from date", fromDateOne);
  // console.log("to date", toDateTwo);
  // console.log("status", status);
  // console.log("warehouse", warehouse);
  // console.log("series", series);
  // console.log("docNum", docNum);
  request.post(
    "http://192.168.1.102:8082/api/ProductionOrderFilters",
    {
      json: {
        // fromDate: fromDateOne,
        // toDate: toDateTwo,
        // status: status,
        // warehouse: "string",
        // series: 0,
        // docNum: 0,
        fromDate: "20200915",
        toDate: "20231216",
        status: "string",
        warehouse: "string",
        series: 0,
        docNum: 0,
      },
    },

    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      console.log("Production Order Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});

app.post("/api/ITRDrafts", (req, res) => {
  const cardCode = req.body.cardCode;

  const refDocEntry = req.body.docEntry;
  const refObjType = req.body.objectType;

  console.log("cardCode", cardCode);
  console.log("refDocEntry", refDocEntry);
  console.log("refObjType", refObjType);
  request.post(
    "http://192.168.1.102:8082/api/ITRDrafts",
    {
      json: {
        cardCode: "VD00019",
        toWarehouse: "01",
        comments: "Test API",
        docDate: "2022-12-16",
        dueDate: "2022-12-16",
        refDocEntry: 2,
        refObjType: "202",

        // "cardCode": cardCode,
        // "toWarehouse": toWarehouse,
        // "comments": comments,
        // "docDate": docDate,
        // "dueDate": dueDate,
        // "refDocEntry": refDocEntry,
        // "refObjType": refObjType,
      },
    },

    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      console.log("ITR ADD api Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});

app.get("/api/getSeries", (req, res) => {
  request.get(
    "http://192.168.1.102:8082/api/Seriess/GetSeriesByObject/22",
    {
      json: {},
    },
    function (error, response, body) {
      if (error) {
        return res.send("Failed to Load Data." + error);
      }
      console.log("Series api Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});

app.get("/api/getWarehouse", (req, res) => {
  request.get(
    "http://192.168.1.102:8082/api/Warehouses/N",
    {
      json: {},
    },
    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      console.log("Warehouse api Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
