import dotenv from 'dotenv';
dotenv.config();

const API_URL = 'http://localhost:8000/api/v1';

const loginAdmin = async () => {
    const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@velsphere.com', password: 'adminpassword123' })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // Cookie handling is tricky with fetch in node, but let's assume token in body is enough for Bearer auth
    return { token: data.accessToken }; // The API returns accessToken in body too
};

const runTest = async () => {
    console.log("🚀 Starting Student Flow Test...");

    try {
        // 1. Login Admin
        const adminAuth = await loginAdmin();
        console.log("✅ Admin Logged In");

        // 2. Get a Domain ID (via API now, safer)
        const domainsRes = await fetch(`${API_URL}/domains`);
        const domainsData = await domainsRes.json();
        const domainId = domainsData.domains[0]._id;

        if (!domainId) throw new Error("No domains found");

        const testEmail = `test.intern.${Date.now()}@velsphere.com`;
        const tempPassword = 'TempPassword123!';

        // 3. Create Student
        const createRes = await fetch(`${API_URL}/students/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminAuth.token}`
            },
            body: JSON.stringify({
                name: 'Test Intern',
                email: testEmail,
                domainId: domainId,
                batch: 'Test-2024',
                password: tempPassword
            })
        });
        const createData = await createRes.json();
        if (!createRes.ok) throw new Error(createData.message);
        console.log("✅ Student Created:", createData.message);

        // 4. Login Student (First Time)
        const loginRes = await fetch(`${API_URL}/students/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: testEmail, password: tempPassword })
        });
        const loginData = await loginRes.json();

        if (loginData.user.isFirstLogin !== true) throw new Error("isFirstLogin should be true");
        console.log("✅ Student First Login Success (isFirstLogin verified)");

        const studentToken = loginData.accessToken;

        // 5. Change Password
        const newPassword = 'NewSecurePassword123!';
        const changeRes = await fetch(`${API_URL}/students/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${studentToken}`
            },
            body: JSON.stringify({ newPassword, confirmPassword: newPassword })
        });
        const changeData = await changeRes.json();
        if (!changeRes.ok) throw new Error(changeData.message);
        console.log("✅ Password Changed:", changeData.message);

        // 6. Login Student (Second Time)
        const login2Res = await fetch(`${API_URL}/students/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: testEmail, password: newPassword })
        });
        const login2Data = await login2Res.json();

        if (login2Data.user.isFirstLogin !== false) throw new Error("isFirstLogin should be false now");
        console.log("✅ Student Second Login Success (isFirstLogin is false)");

        // 7. Cleanup (Delete Student)
        const deleteRes = await fetch(`${API_URL}/students/${login2Data.user._id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${adminAuth.token}` }
        });
        if (deleteRes.ok) console.log("✅ Cleanup: Test Student Deleted");

        console.log("\n🎉 ALL TESTS PASSED! The student flow is perfect.");

    } catch (e) {
        console.error("\n❌ TEST FAILED:", e.message);
        process.exit(1);
    }
};

runTest();
