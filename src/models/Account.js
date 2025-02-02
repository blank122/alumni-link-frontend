class Account {
    constructor(account_id, email, email_verified = null, password = null, alumni_id, status, account_type) {
        this.account_id = account_id;
        this.email = email;
        this.email_verified = email_verified;
        this.password = password;
        this.alumni_id = alumni_id;
        this.status = status;
        this.account_type = account_type;
    }

    // Helper method to check if the account is approved
    isApproved() {
        return this.status === 2; // Approved
    }

    // Helper method to check if the account is an admin
    isAdmin() {
        return this.account_type === 1; // Admin
    }

}

export default Account;
