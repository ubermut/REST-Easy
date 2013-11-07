/*
 * resteasy.js - Interactivity for the REST Easy addon
 * Copyright 2013 - Nathan Osman
 */

function RestEasy() {
    
    var request_headers = new MapInput($('#request-headers'));
    
    // Utility methods to look up values
    function getUrl()    { return $('#url').val(); }
    function getMethod() { return $('input[name=options]:checked').val(); }
    
    // Toggles progress display
    function showProgress(show) {
        
        if(show) {
            $('#response').hide();
            $('#progress').show();
        } else {
            $('#progress').hide();
            $('#response').show();
        }
    }
    
    // Generates the HTML for the headers tab
    function generateHeadersTab(req) {
        
        var html = '<h4>Details</h4><p><strong>Status:</strong> ' + req.status + ' ' + req.statusText + '</p><br>';
        var headers = req.getAllResponseHeaders().split('\n');
        
        html += '<h4>Headers</h4><table class="table table-striped"><tr><th>Name</th><th>Value</th></tr>';
        for(var i = 0; i < headers.length; ++i) {
            
            var split = headers[i].indexOf(':');
            if(split != -1)
                html += '<tr><td>' + headers[i].substr(0, split) + '</td><td>' + headers[i].substr(split + 1) + '</td></tr>';
        }
        html += '</table>';
        
        return html;
    }
    
    // Generates the HTML for the raw tab
    function generateRawTab(req) {
        
        function escape(html) {
            return html.replace(/&/g, '&amp;')
                       .replace(/</g, '&lt;')
                       .replace(/>/g, '&gt;');
        }
        
        return '<pre>' + escape(req.responseText) + '</pre>';
    }
    
    // Generates the HTML for the preview tab
    function generatePreviewTab(req) {
        
        return '[TODO]';
    }
    
    // Loads options into the form controls
    function loadOptions() {
        
        //...
    }
    
    // Saves options from the form controls
    function saveOptions() {
        
        //...
    }
    
    // Issues the request
    $('#send').click(function() {
        
        var req = new XMLHttpRequest();
        req.open(getMethod(), getUrl());
        
        var headers = request_headers.get();
        for(var name in headers)
            req.setRequestHeader(name, headers[name]);
        
        req.onreadystatechange = function() {
            
            if (req.readyState == 4) {
                
                $('#headers').html(generateHeadersTab(req));
                $('#raw')    .html(generateRawTab(req));
                $('#preview').html(generatePreviewTab(req));
                
                showProgress(false);
            }
        };
        
        req.send();
        showProgress(true);
    });
};

// Initialize everything as soon as the DOM loads
$(document).ready(function() {
    new RestEasy();
});
