var botScriptExecutor = require('bot-script').executor;
var scr_config = require('./scr_config.json');

function MessageHandler(context, event) { 
  	var a=event.message;
	if(event.message=='hi' || event.message=='hey' || event.message=='hello'){
		context.sendResponse("Hello, How can I help you");
	}
    if(String(a).indexOf("website")>=0 || String(a).indexOf("this website")>=0){
    	context.sendResponse("It is a platform for early education, It Manages classrooms, observe students, collect tuition, and stay in touch with families – all from one easy-to-use childcare app.\nFor more information you can contact us at soldertrust@gmail.com");
    }
    if(String(a).indexOf("benifits")>=0 || String(a).indexOf("benifit")>=0 || String(a).indexOf("beneficiary")>=0){
    	context.sendResponse("85% of users would recommend soldertrust to a director, teacher, or parent.\n100% of parents are more satisfied with their school experience once soldertrust is implemented.\n10s of millions of classroom moments documented and shared per week.\nFor more information you can contact us at soldertrust@gmail.com");
    }
    if(String(a).indexOf("price")>=0 || String(a).indexOf("pricing")>=0){
    	context.sendResponse("Try it free for 30 days. You can view the pricing in the link given below.\nFor more information you can contact us at soldertrust@gmail.com");
    }
    if(String(a).indexOf("worth")>=0){
    	context.sendResponse("Yes of course\nIt has a award winning support\nIt is Safe & secure\nAnd requires no training");
    }
    else { 
        context.sendResponse('No keyword found : '+event.message); 
    }
}

function EventHandler(context, event) {
    context.simpledb.roomleveldata = {};
    MessageHandler(context, event);
}


function ScriptHandler(context, event){
    var options = Object.assign({}, scr_config);
    options.current_dir = __dirname;
    //options.default_message = "Sorry Some Error Occurred.";
    // You can add any start point by just mentioning the <script_file_name>.<section_name>
    // options.start_section = "default.main";
    options.success = function(opm){
        context.sendResponse(JSON.stringify(opm));
    };
    options.error = function(err) {
        console.log(err.stack);
        context.sendResponse(options.default_message);
    };
    botScriptExecutor.execute(options, event, context);
}

function HttpResponseHandler(context, event) {
    if (event.geturl === "http://ip-api.com/json")
        context.sendResponse('This is response from http \n' + JSON.stringify(event.getresp, null, '\t'));
}

function DbGetHandler(context, event) {
    context.sendResponse("testdbput keyword was last sent by:" + JSON.stringify(event.dbval));
}

function DbPutHandler(context, event) {
    context.sendResponse("testdbput keyword was last sent by:" + JSON.stringify(event.dbval));
}

function HttpEndpointHandler(context, event) {
    context.sendResponse('This is response from http \n' + JSON.stringify(event, null, '\t'));
}

function LocationHandler(context, event) {
    context.sendResponse("Got location");
}

exports.onMessage = MessageHandler;
exports.onEvent = EventHandler;
exports.onHttpResponse = HttpResponseHandler;
exports.onDbGet = DbGetHandler;
exports.onDbPut = DbPutHandler;
if (typeof LocationHandler == 'function') { exports.onLocation = LocationHandler; }
if (typeof HttpEndpointHandler == 'function') { exports.onHttpEndpoint = HttpEndpointHandler; }

