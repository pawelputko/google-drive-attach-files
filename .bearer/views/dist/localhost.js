/*!
 * Built with http://stenciljs.com
 * 2019-00-23T15:28:32
 */
(function(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components) {

  function init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCorePolyfilled, hydratedCssClass, components, HTMLElementPrototype, App, x, y, scriptElm) {
    // create global namespace if it doesn't already exist
    App = win[namespace] = win[namespace] || {};
    App.components = components;
    y = components.filter(function (c) { return c[2]; }).map(function (c) { return c[0]; });
    if (y.length) {
        // auto hide components until they been fully hydrated
        // reusing the "x" and "i" variables from the args for funzies
        x = doc.createElement('style');
        x.innerHTML = y.join() + '{visibility:hidden}.' + hydratedCssClass + '{visibility:inherit}';
        x.setAttribute('data-styles', '');
        doc.head.insertBefore(x, doc.head.firstChild);
    }
    createComponentOnReadyPrototype(win, namespace, HTMLElementPrototype);
    resourcesUrl = resourcesUrl || App.resourcesUrl;
    // figure out the script element for this current script
    y = doc.querySelectorAll('script');
    for (x = y.length - 1; x >= 0; x--) {
        scriptElm = y[x];
        if (scriptElm.src || scriptElm.hasAttribute('data-resources-url')) {
            break;
        }
    }
    // get the resource path attribute on this script element
    y = scriptElm.getAttribute('data-resources-url');
    if (!resourcesUrl && y) {
        // the script element has a data-resources-url attribute, always use that
        resourcesUrl = y;
    }
    if (!resourcesUrl && scriptElm.src) {
        // we don't have an exact resourcesUrl, so let's
        // figure it out relative to this script's src and app's filesystem namespace
        y = scriptElm.src.split('/').slice(0, -1);
        resourcesUrl = (y.join('/')) + (y.length ? '/' : '') + fsNamespace + '/';
    }
    // request the core this browser needs
    // test for native support of custom elements and fetch
    // if either of those are not supported, then use the core w/ polyfills
    // also check if the page was build with ssr or not
    x = doc.createElement('script');
    if (usePolyfills(win, win.location, x, 'import("")')) {
        // requires the es5/polyfilled core
        x.src = resourcesUrl + appCorePolyfilled;
    }
    else {
        // let's do this!
        x.src = resourcesUrl + appCore;
        x.setAttribute('type', 'module');
        x.setAttribute('crossorigin', true);
    }
    x.setAttribute('data-resources-url', resourcesUrl);
    x.setAttribute('data-namespace', fsNamespace);
    doc.head.appendChild(x);
}
function usePolyfills(win, location, scriptElm, dynamicImportTest) {
    // fyi, dev mode has verbose if/return statements
    // but it minifies to a nice 'lil one-liner ;)
    if (location.search.indexOf('core=esm') > 0) {
        // force esm build
        return false;
    }
    if ((location.search.indexOf('core=es5') > 0) ||
        (location.protocol === 'file:') ||
        (!(win.customElements && win.customElements.define)) ||
        (!win.fetch) ||
        (!(win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'))) ||
        (!('noModule' in scriptElm))) {
        // es5 build w/ polyfills
        return true;
    }
    // final test to see if this browser support dynamic imports
    return doesNotSupportsDynamicImports(dynamicImportTest);
}
function doesNotSupportsDynamicImports(dynamicImportTest) {
    try {
        new Function(dynamicImportTest);
        return false;
    }
    catch (e) { }
    return true;
}
function createComponentOnReadyPrototype(win, namespace, HTMLElementPrototype) {
    (win['s-apps'] = win['s-apps'] || []).push(namespace);
    if (!HTMLElementPrototype.componentOnReady) {
        HTMLElementPrototype.componentOnReady = function componentOnReady() {
            /*tslint:disable*/
            var elm = this;
            function executor(resolve) {
                if (elm.nodeName.indexOf('-') > 0) {
                    // window hasn't loaded yet and there's a
                    // good chance this is a custom element
                    var apps = win['s-apps'];
                    var appsReady = 0;
                    // loop through all the app namespaces
                    for (var i = 0; i < apps.length; i++) {
                        // see if this app has "componentOnReady" setup
                        if (win[apps[i]].componentOnReady) {
                            // this app's core has loaded call its "componentOnReady"
                            if (win[apps[i]].componentOnReady(elm, resolve)) {
                                // this component does belong to this app and would
                                // have fired off the resolve fn
                                // let's stop here, we're good
                                return;
                            }
                            appsReady++;
                        }
                    }
                    if (appsReady < apps.length) {
                        // not all apps are ready yet
                        // add it to the queue to be figured out when they are
                        (win['s-cr'] = win['s-cr'] || []).push([elm, resolve]);
                        return;
                    }
                }
                // not a recognized app component
                resolve(null);
            }
            // callback wasn't provided, let's return a promise
            if (win.Promise) {
                // use native/polyfilled promise
                return new win.Promise(executor);
            }
            // promise may not have been polyfilled yet
            return { then: executor };
        };
    }
}


  init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components);

  })(window, document, "localhost","localhost",0,"localhost.core.js","es5-build-disabled.js","hydrated",[["bearer-alert","bearer-alert",1,[["content",1,0,1,1],["kind",1,0,1,2],["onDismiss",1]],1],["bearer-authorized","connect-action",0,[["authenticate",6],["bearerContext",3,0,0,0,"bearer"],["isAuthorized",5],["renderAuthorized",1],["renderUnauthorized",1],["revoke",6],["scenarioId",1,0,"scenario-id",2],["sessionInitialized",5]]],["bearer-badge","setup-display",1,[["content",1,0,1,1],["kind",1,0,1,2]],1],["bearer-button","bearer-button",1,[["as",1,0,1,2],["content",1,0,1,1],["disabled",1,0,1,3],["kind",1,0,1,2],["outline",1,0,1,3],["size",1,0,1,2]],1],["bearer-checkbox","setup-action",1,[["buttons",1],["controlName",1,0,"control-name",2],["el",7],["inline",1,0,1,3],["label",1,0,1,2],["value",2]],1],["bearer-dropdown-button","setup-action",1,[["btnProps",1],["innerListener",1,0,"inner-listener",2],["opened",1,0,1,3],["toggle",6],["visible",5]],1,[["body:click","clickOutsideHandler"],["click","clickInsideHandler"]]],["bearer-form","setup-action",1,[["clearOnInput",1,0,"clear-on-input",3],["fields",2],["hasBeenCleared",5],["updateFieldSet",6],["values",5]],1,[["keydown.enter","handleEnterKey"]]],["bearer-input","setup-action",1,[["controlName",1,0,"control-name",2],["disabled",1,0,1,3],["el",7],["hint",2,0,1,2],["label",1,0,1,2],["placeholder",1,0,1,2],["type",1,0,1,2],["value",2,0,1,2]],1],["bearer-loading","bearer-loading",1,0,1],["bearer-radio","setup-action",1,[["buttons",1],["controlName",1,0,"control-name",2],["el",7],["inline",1,0,1,3],["label",1,0,1,2],["value",2,0,1,2]],1],["bearer-select","setup-action",1,[["controlName",1,0,"control-name",2],["el",7],["label",1,0,1,2],["options",2],["value",2,0,1,2]],1],["bearer-setup","setup-action",1,[["element",7],["error",5],["fieldSet",5],["fields",1,0,1,2],["loading",5],["referenceId",1,0,"reference-id",2],["scenarioId",1,0,"scenario-id",2]],1],["bearer-setup-display","setup-display",0,[["isSetup",5],["scenarioId",1,0,"scenario-id",2],["setupId",2,0,"setup-id",2]],1],["bearer-textarea","setup-action",1,[["controlName",1,0,"control-name",2],["el",7],["hint",2,0,1,2],["label",1,0,1,2],["placeholder",1,0,1,2],["value",2,0,1,2]],1],["connect-action","connect-action",1,[["authId",2,0,"auth-id",2],["authIdInternal",5],["bearerContext",3,0,0,0,"bearer"],["el",7],["setupId",1,0,"setup-id",2]]],["feature-action","feature-action",1,[["attachedFiles",5],["attachedFilesRefId",2,0,"attached-files-ref-id",2],["authId",2,0,"auth-id",2],["bearerContext",3,0,0,0,"bearer"],["data",5],["el",7],["fetchingFiles",5],["fileItems",5],["files",5],["filesRefId",2,0,"files-ref-id",2],["folders",5],["input",5],["message",5],["path",5],["selectedFolder",5],["setupId",1,0,"setup-id",2],["storedFiles",5]],1,[["body:bearer|607e36-poc-google-attach-file|connect|authorized","authorizedHandler"],["body:bearer|607e36-poc-google-attach-file|connect|revoked","revokedHandler"],["body:bearer|607e36-poc-google-attach-file|feature|attachedFilesSaved","attachedFilesRefIdChanged"]]],["feature-display","feature-display",1,[["attachedFiles",5],["attachedFilesRefId",2,0,"attached-files-ref-id",2],["bearerContext",3,0,0,0,"bearer"],["files",5],["filesRefId",2,0,"files-ref-id",2],["setupId",1,0,"setup-id",2]],1,[["body:bearer|607e36-poc-google-attach-file|feature|filesSaved","filesRefIdChanged"]]],["setup-action","setup-action",1,[["bearerContext",3,0,0,0,"bearer"],["fields",5],["innerListener",5],["onSetupSuccess",1],["setupId",1,0,"setup-id",2]],1],["setup-display","setup-display",1,[["bearerContext",3,0,0,0,"bearer"],["setupId",1,0,"setup-id",2]],1]],HTMLElement.prototype);