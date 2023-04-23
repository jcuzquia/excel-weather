// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license in the root of the repo.
/*
    This file provides the provides functionality to get Microsoft Graph data.
*/

import axios from "axios";
import { showMessage } from "./message-helper";

export async function callGetUserData(middletierToken: string): Promise<any> {
  try {
    const response = await axios.get("/getuserdata", { headers: { Authorization: "Bearer " + middletierToken } });

    return response;
  } catch (err) {
    showMessage(`Error from middle tier. \n${err.responseText || err.message}`);
    throw err;
  }
}
