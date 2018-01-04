/**
 * @api {get} /music/ Get Music
 * @apiName FetchingMusicList
 * @apiGroup Music
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *	success: true,
 *	total: 1,
 *	message: "Success",
 *	data: -[-{
 *		_id: "597346007e04a312d3f5e08d",
 *		updatedAt: "2017-07-22T12:33:04.727Z",
 *		createdAt: "2017-07-22T12:33:04.727Z",
 *		title: "h",
 *		url: "test",
 *		cover: "http://abc.com",
 *		__v: 0
 *	}]
 *}
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 100 Error while adding
 * {
 *   "success": false,
 *   "message": "Server is not running.",
 *   "data": {},
 *   "errors": []
 * }
 */


// Add a new music
 /**
  * @api {post} /music Add a new music
  * @apiName CreateMusic
  * @apiGroup Music
  *
  * @apiParam {String} title Title of the Music.
  * @apiParam {String} url Link of the mp3 sound.
  * @apiParam {String} cover Image url.
  * @apiParam {String} artist Array of names.
  * @apiParam {String} album Album name.
  *
  * @apiParamExample {json} Request-Example:
  * {
  *	 "title": "h",
  *	 "url": "test",
  *	 "cover": "http://abc.com"
  * }
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *  {
  *      "success": true,
  *      "message": "Success",
  *      "data": {
  *          "__v": 0,
  *          "updatedAt": "2017-07-22T12:33:04.727Z",
  *          "createdAt": "2017-07-22T12:33:04.727Z",
  *          "title": "h",
  *          "description": "test",
  *          "image": "http://abc.com",
  *          "_id": "597346007e04a312d3f5e08d"
  *      }
  *  }
  * @apiErrorExample Error-Response:
  *     HTTP/1.1 100 Error while finding user
  *  {
  *    "success": false,
  *    "message": "Some technical error. Please try after some time",
  *    "data": {},
  *    "errors": []
  *  }
  */
