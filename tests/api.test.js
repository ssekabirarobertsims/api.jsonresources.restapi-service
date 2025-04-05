const request = require("supertest");
const application = require("../controller/server/api.server.controller");
const resourcesRouters = require("../controller/routers/resources.controller");
import { describe, test, expect, it } from "vitest";

// test root routes for api
describe("/", () => {
  // test for root route
  test("test for root route for the api", async () => {
    const response = await request(application).get("/");
    expect(response.headers["content-type"]).toStrictEqual(
      expect.stringContaining("html")
    );
    expect(response.statusCode).toEqual(200);
    expect(response).toBeDefined();
  });

  // test for root api info route
  test("test for root api info route", async () => {
    const response = await request(application).get("/api/legal/information");
    expect(response.headers["content-type"]).toStrictEqual(
      expect.stringContaining("json")
    );
    expect(response.statusCode).toEqual(200);
    expect(response.statusCode).not.toEqual(500);
    expect(response.statusCode).not.toBe(500);
  });
});

// test for resources retrieval, deletion, posting and updating end points
// ******test for texts resources***** //
describe("/resources/texts", () => {
  // get
  test("test getting texts resources!!!", async () => {
    const response = await request(application).get("/resources/texts");

    expect(response.statusCode).toEqual(Number.parseInt(200));
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  // post
  test("test posting texts resources", async () => {
    const response = await request(application).post("/resources/texts").send({
      text: "sample",
    });

    expect(response.headers["content-type"]).toStrictEqual(
      expect.stringContaining("json")
    );
    expect(response.statusCode).toEqual(Number.parseInt(200));
    expect(response.body.message).toBeDefined();
  });

  // delete
  test("test deleting texts resources", async () => {
    const response = await request(application).delete(
      "/resources/texts/242c59c1-dba4-4e1c-a2eb-056b12e8d32e"
    );
    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toStrictEqual(
      expect.stringContaining("json")
    );
  });

  // update
  test("test updating texts resources", async () => {
    const response = await request(application).delete(
      "/resources/texts/242c59c1-dba4-4e1c-a2eb-056b12e8d32e"
    );
    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toStrictEqual(
      expect.stringContaining("json")
    );
  });
});

// ******tests for users resources****** //
describe("/resources/users", () => {
  // get
  test("test getting users resources!!!", async () => {
    const response = await request(application).get("/resources/users");

    expect(response.statusCode).toEqual(Number.parseInt(200));
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  // post
  test("test posting users resources", async () => {
    const response = await request(application).post("/resources/users").send({
      first_name: "johnny",
      last_name: "boy",
      email: "johnnyB91@gmail.com",
      job: "preacher",
    });

    expect(response.headers["content-type"]).toStrictEqual(
      expect.stringContaining("json")
    );
    expect(response.statusCode).toEqual(Number.parseInt(200));
    expect(response.body.message).toBeDefined();
  });

  // delete
  test("test deleting users resources", async () => {
    const response = await request(application).delete(
      "/resources/users/030f3d31-5209-482e-a391-ae669a1b7f04"
    );
    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toStrictEqual(
      expect.stringContaining("json")
    );
  });

  // update
  test("test updating users resources", async () => {
    const response = await request(application).delete(
      "/resources/users/030f3d31-5209-482e-a391-ae669a1b7f04"
    );
    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toStrictEqual(
      expect.stringContaining("json")
    );
  });
});

// // ******tests for photos resources****** //
describe("/resources/photos", () => {
  // get
  test("test getting photos resources!!!", async () => {
    const response = await request(application).get("/resources/photos");

    expect(response.statusCode).toEqual(Number.parseInt(200));
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  // post
  test("test posting photos resources", async () => {
    const response = await request(application).post("/resources/photos").send({
      image_url: "sample.jpeg",
    });

    expect(response.headers["content-type"]).toStrictEqual(
      expect.stringContaining("json")
    );
    expect(response.statusCode).toEqual(Number.parseInt(200));
    expect(response.body.message).toBeDefined();
  });

  // delete
  test("test deleting photos resources", async () => {
    const response = await request(application).delete(
      "/resources/photos/fb633db6-e82e-4ccc-897b-ec3baw37899be"
    );
    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toStrictEqual(
      expect.stringContaining("json")
    );
  });

  // update
  test("test updating photos resources", async () => {
    const response = await request(application).delete(
      "/resources/photos/fb633db6-e82e-4ccc-897b-ec3baw37899be"
    );
    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toStrictEqual(
      expect.stringContaining("json")
    );
  });
});

// // ******tests for posts resources****** //
describe("/resources/posts", () => {
  // get
  test("test getting posts resources!!!", async () => {
    const response = await request(application).get("/resources/posts");

    expect(response.statusCode).toEqual(Number.parseInt(200));
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  // post
  test("test posting posts resources", async () => {
    const response = await request(application).post("/resources/posts").send({
      post: "sample",
      title: "sample",
    });

    expect(response.headers["content-type"]).toStrictEqual(
      expect.stringContaining("json")
    );
    expect(response.statusCode).toEqual(Number.parseInt(200));
    expect(response.body.message).toBeDefined();
  });

  // delete
  test("test deleting posts resources", async () => {
    const response = await request(application).delete(
      "/resources/posts/fb633db6-e8e-4ccc-897b-ec3ba37899be"
    );
    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toStrictEqual(
      expect.stringContaining("json")
    );
  });

  // update
  test("test updating posts resources", async () => {
    const response = await request(application).delete(
      "/resources/posts/fb633db6-e8e-4ccc-897b-ec3ba37899be"
    );
    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toStrictEqual(
      expect.stringContaining("json")
    );
  });
});
