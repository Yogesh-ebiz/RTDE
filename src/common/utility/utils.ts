import { Response } from "express"
import R from "../types"

interface IutilFunctions {
    sendResponse: (res: Response, data: R<any> ) => any
}

class utilFunctions implements IutilFunctions {
    sendResponse(res: Response, data: R<any>, validation_error = 0) {
        if (data.hasError) {
            return res.status(data.errorLevel!).json({ message: data.message, status: false, data: data.error })
        } else if (validation_error == 1) {
            return res.status(400).json({ message: 'Validation Error', status: false, errors: data });
        } else {
            return res.status(200).json({ message: data.message, status: true, data: data.result });
        }
    }
}

const utilFunction = new utilFunctions();
export default utilFunction;