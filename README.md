# Finn
A wrapper around Cisco's Finesse library to make gadget development easier.

## Basic Usage

```
const GADGET_NAME = "MyAwesomeGadget";

let popVariable = "callVariable5";

finn = new Finn(GADGET_NAME);
finn.on('call_started', handleCallStarted);
finn.on('call_updated', handleCallUpdated);
finn.on('call_ended', handleCallEnded);

finn.load(function(err, agent) {
  if (err) {
      console.error(gadget_name + ': Error loading Finesse User.');
      return;
  }
  
  // logs as "MyAwesomeGadget: Gadget Loaded" via the Finesse SDK logger
  finn.log("Gadget Loaded");
  
  // Helper method to retrieve query parameters from the gadget URL defined in the layout XML
  // Allows you to parameterize gadget variables dynamically per layout
  popVariable = finn.container.getParameter("popVariable") || popVariable;
  
}

function handleCallStarted(call) {
  finn.log("Call " + call.id + " started: from: " + call.fromAddress + " to: " + call.toAddress);
  finn.log("Call " + popVariable + " is: " + call.data[popVariable];
}

function handleCallUpdated(call) {
  finn.log("Call " + call.id + " updated: from: " + call.fromAddress + " to: " + call.toAddress);
  finn.log("Call " + popVariable + " is: " + call.data[popVariable];
}

function handleCallEnded(call) {
  finn.log("Call " + call.id + " ended");
}

```
