<?php

namespace App\Providers;

use Laravel\Passport\Passport;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    // protected $policies = [];

    // public function boot(): void
    // {
    //     Passport::loadKeysFrom(__DIR__.'/../../storage');
    //     Passport::tokensExpireIn(now()->addHours(2));
    //     Passport::refreshTokensExpireIn(now()->addDays(30)); // Refresh token
    // }

    public function boot(): void
    {
        $this->registerPolicies();

        // Point exactly to the folder where your entrypoint.sh creates the keys
        Passport::loadKeysFrom(storage_path('oauth'));

        // Your expiration logic is good!
        Passport::tokensExpireIn(now()->addHours(2));
        Passport::refreshTokensExpireIn(now()->addDays(30));

        // Optional: If you use Personal Access Tokens, set their expiry too
        Passport::personalAccessTokensExpireIn(now()->addMonths(6));
    }

}
