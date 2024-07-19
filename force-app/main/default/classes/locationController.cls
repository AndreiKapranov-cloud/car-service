public with sharing class locationController {
    public locationController() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Schema.Location> getLocation() {
        return [
            SELECT Id,Name FROM Location where IsInventoryLocation = true LIMIT 200
       ];
    }
}