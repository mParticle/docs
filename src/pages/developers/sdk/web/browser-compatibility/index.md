---
title: Browser Compatibility
order: 18
---

mParticle's core functionality includes sending events and identifying users. These features are compatible with the following browsers:

- Chrome 27+
- Firefox 27+
- Safari 8+
- Edge All Versions
- IE 10+

Additionally, mParticle takes advantage of web APIs that vary in terms of browser compatibility in order to further optimize your event tracking and success rates:

| Web API                                                                                                                     | Description                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Navigator.sendBeacon](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon#Browser_compatibility)         | Allows the SDK to complete event uploads even if a user closes a browser window (v3 events endpoint only)                                                   |
| [Navigator.watchPosition](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition#Browser_compatibility) | gathers user's position. For very old browsers who don't have this, you can alternatively set the position yourself using `mParticle.setPosition(lat, lng)` |
