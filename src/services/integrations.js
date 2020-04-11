let tagsWithGroups = null;

function getUpdatedIntegrations(partners) {
    var idMap = getIntegrationsIdMap(partners);
    for (var key in idMap) {
        var partnerData = idMap[key];
        partnerData.partnerImage = partnerData.ImageURLSVG || partnerData.ImageURL;
        partnerData.categories = partnerData.Tags
                && partnerData.Tags.split(',').map(x => x.trim());
    }

    return idMap;
}

function getIntegrationsIdMap(json) {
    const idMap = {};
    if (json && json.Partners) {
        json.Partners.forEach((partner) => {
            if (partner.Id) {
                idMap[partner.Id] = partner;
            }
            if (partner.DisplayName) {
                idMap[partner.DisplayName] = partner;
            }
        });
    }
    if (json.TagsWithGroups) {
        tagsWithGroups = json.TagsWithGroups;
    }
    return idMap;
}




module.exports = {
    getUpdatedIntegrations,
    getIntegrationsIdMap
}