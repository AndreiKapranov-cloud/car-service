public with sharing class LocationController {
    public LocationController() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Schema.Location> getLocation() {
        return [
            SELECT Id,Name FROM Location where IsInventoryLocation = true LIMIT 200
       ];
    }
}