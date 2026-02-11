<?php

namespace App\Providers;

use Laravel\Passport\Passport;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [];

    public function boot(): void
    {
        Passport::loadKeysFrom(__DIR__.'/../../storage');
        Passport::tokensExpireIn(now()->addHours(2));
        Passport::refreshTokensExpireIn(now()->addDays(30)); // Refresh token
    }

    // public function boot(): void
    // {
    //     $this->registerPolicies();

    //     // Point exactly to the folder where your entrypoint.sh creates the keys
    //     Passport::loadKeysFrom(storage_path('oauth'));

    //     // Force Passport to use the Client ID and Secret from your Environment Variables
    //     Passport::usePersonalAccessClient(
    //         config('passport.personal_access_client.id'),
    //         config('passport.personal_access_client.secret')
    //     );

    //     // Optional: If you use Personal Access Tokens, set their expiry too
    //     Passport::personalAccessTokensExpireIn(now()->addMonths(6));
    // }

}
