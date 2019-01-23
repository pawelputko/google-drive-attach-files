// localhost: Host Data, ES Module/ES5 Target

export var Alert = ["bearer-alert",function(o){return(o.scoped?import("./bearer-alert.sc.js"):import("./bearer-alert.js")).then(function(m){return m.BearerAlert})},1,[["content",1,0,1,1],["kind",1,0,1,2],["onDismiss",1]],1];

export var BearerAuthorized = ["bearer-authorized",function(){return(import("./connect-action.js")).then(function(m){return m.BearerAuthorized})},0,[["authenticate",6],["bearerContext",3,0,0,0,"bearer"],["isAuthorized",5],["renderAuthorized",1],["renderUnauthorized",1],["revoke",6],["scenarioId",1,0,"scenario-id",2],["sessionInitialized",5]]];

export var BearerBadge = ["bearer-badge",function(o){return(o.scoped?import("./setup-display.sc.js"):import("./setup-display.js")).then(function(m){return m.BearerBadge})},1,[["content",1,0,1,1],["kind",1,0,1,2]],1];

export var Button = ["bearer-button",function(o){return(o.scoped?import("./bearer-button.sc.js"):import("./bearer-button.js")).then(function(m){return m.BearerButton})},1,[["as",1,0,1,2],["content",1,0,1,1],["disabled",1,0,1,3],["kind",1,0,1,2],["outline",1,0,1,3],["size",1,0,1,2]],1];

export var BearerCheckbox = ["bearer-checkbox",function(o){return(o.scoped?import("./setup-action.sc.js"):import("./setup-action.js")).then(function(m){return m.BearerCheckbox})},1,[["buttons",1],["controlName",1,0,"control-name",2],["el",7],["inline",1,0,1,3],["label",1,0,1,2],["value",2]],1];

export var BearerDropdownButton = ["bearer-dropdown-button",function(o){return(o.scoped?import("./setup-action.sc.js"):import("./setup-action.js")).then(function(m){return m.BearerDropdownButton})},1,[["btnProps",1],["innerListener",1,0,"inner-listener",2],["opened",1,0,1,3],["toggle",6],["visible",5]],1,[["body:click","clickOutsideHandler"],["click","clickInsideHandler"]]];

export var BearerForm = ["bearer-form",function(o){return(o.scoped?import("./setup-action.sc.js"):import("./setup-action.js")).then(function(m){return m.BearerForm})},1,[["clearOnInput",1,0,"clear-on-input",3],["fields",2],["hasBeenCleared",5],["updateFieldSet",6],["values",5]],1,[["keydown.enter","handleEnterKey"]]];

export var BearerInput = ["bearer-input",function(o){return(o.scoped?import("./setup-action.sc.js"):import("./setup-action.js")).then(function(m){return m.BearerInput})},1,[["controlName",1,0,"control-name",2],["disabled",1,0,1,3],["el",7],["hint",2,0,1,2],["label",1,0,1,2],["placeholder",1,0,1,2],["type",1,0,1,2],["value",2,0,1,2]],1];

export var BearerLoader = ["bearer-loading",function(o){return(o.scoped?import("./bearer-loading.sc.js"):import("./bearer-loading.js")).then(function(m){return m.BearerLoading})},1,0,1];

export var BearerRadio = ["bearer-radio",function(o){return(o.scoped?import("./setup-action.sc.js"):import("./setup-action.js")).then(function(m){return m.BearerRadio})},1,[["buttons",1],["controlName",1,0,"control-name",2],["el",7],["inline",1,0,1,3],["label",1,0,1,2],["value",2,0,1,2]],1];

export var BearerSelect = ["bearer-select",function(o){return(o.scoped?import("./setup-action.sc.js"):import("./setup-action.js")).then(function(m){return m.BearerSelect})},1,[["controlName",1,0,"control-name",2],["el",7],["label",1,0,1,2],["options",2],["value",2,0,1,2]],1];

export var BearerSetup = ["bearer-setup",function(o){return(o.scoped?import("./setup-action.sc.js"):import("./setup-action.js")).then(function(m){return m.BearerSetup})},1,[["element",7],["error",5],["fieldSet",5],["fields",1,0,1,2],["loading",5],["referenceId",1,0,"reference-id",2],["scenarioId",1,0,"scenario-id",2]],1];

export var BearerSetupDisplay = ["bearer-setup-display",function(o){return(o.scoped?import("./setup-display.sc.js"):import("./setup-display.js")).then(function(m){return m.BearerSetupDisplay})},0,[["isSetup",5],["scenarioId",1,0,"scenario-id",2],["setupId",2,0,"setup-id",2]],1];

export var BearerTextarea = ["bearer-textarea",function(o){return(o.scoped?import("./setup-action.sc.js"):import("./setup-action.js")).then(function(m){return m.BearerTextarea})},1,[["controlName",1,0,"control-name",2],["el",7],["hint",2,0,1,2],["label",1,0,1,2],["placeholder",1,0,1,2],["value",2,0,1,2]],1];

export var ConnectAction = ["connect-action",function(){return(import("./connect-action.js")).then(function(m){return m.ConnectAction})},1,[["authId",2,0,"auth-id",2],["authIdInternal",5],["bearerContext",3,0,0,0,"bearer"],["el",7],["setupId",1,0,"setup-id",2]]];

export var FeatureAction = ["feature-action",function(o){return(o.scoped?import("./feature-action.sc.js"):import("./feature-action.js")).then(function(m){return m.FeatureAction})},1,[["attachedFiles",5],["attachedFilesRefId",2,0,"attached-files-ref-id",2],["authId",2,0,"auth-id",2],["bearerContext",3,0,0,0,"bearer"],["data",5],["el",7],["fetchingFiles",5],["fileItems",5],["files",5],["filesRefId",2,0,"files-ref-id",2],["folders",5],["input",5],["message",5],["path",5],["selectedFolder",5],["setupId",1,0,"setup-id",2],["storedFiles",5]],1,[["body:bearer|607e36-poc-google-attach-file|connect|authorized","authorizedHandler"],["body:bearer|607e36-poc-google-attach-file|connect|revoked","revokedHandler"],["body:bearer|607e36-poc-google-attach-file|feature|attachedFilesSaved","attachedFilesRefIdChanged"]]];

export var FeatureDisplay = ["feature-display",function(o){return(o.scoped?import("./feature-display.sc.js"):import("./feature-display.js")).then(function(m){return m.FeatureDisplay})},1,[["attachedFiles",5],["attachedFilesRefId",2,0,"attached-files-ref-id",2],["bearerContext",3,0,0,0,"bearer"],["files",5],["filesRefId",2,0,"files-ref-id",2],["setupId",1,0,"setup-id",2]],1,[["body:bearer|607e36-poc-google-attach-file|feature|filesSaved","filesRefIdChanged"]]];

export var SetupAction = ["setup-action",function(o){return(o.scoped?import("./setup-action.sc.js"):import("./setup-action.js")).then(function(m){return m.SetupAction})},1,[["bearerContext",3,0,0,0,"bearer"],["fields",5],["innerListener",5],["onSetupSuccess",1],["setupId",1,0,"setup-id",2]],1];

export var SetupDisplay = ["setup-display",function(o){return(o.scoped?import("./setup-display.sc.js"):import("./setup-display.js")).then(function(m){return m.SetupDisplay})},1,[["bearerContext",3,0,0,0,"bearer"],["setupId",1,0,"setup-id",2]],1];