# Publishing packages:
Follow these steps to publish packages in the development workflow:

1. Create a Pull Request against the `staging` branch, ensuring that it is reviewed and merged. This will automatically trigger the `publish-release.yml` GitHub Action which will publish the package for testing purposes to the npm registry.
2. Test test test. Then test again. Note: We do QA against the package published from staging, not against PR packages.
3. Create a Pull Request against the `main` branch, have it reviewed, and then merge it. Upon merging, the `ci-release.yml` GitHub Action will generate a GitHub Release with the status "DRAFT".
4. After confirming that everything has been tested, publish the release. You can do this by clicking the "Publish release" button on the draft release page.
5. If the Release is published, the `publish-release.yml` GitHub Action will automatically publish the package.
6. Verify that the final packages have been deployed to `npm`. You can do this by checking the npm registry to see if the new version of the package is available.
