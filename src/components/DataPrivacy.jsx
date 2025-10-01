// components/DataPrivacyModal.jsx

const DataPrivacyModal = ({ isOpen, onAgree }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Data Privacy Policy</h2>
        <div className="text-sm text-gray-700 space-y-3">
          <p><strong>1. Information We Collect:</strong> AlumniLink collects personal data such as your name, email address, academic program, graduation year, employment details, and location.</p>
          <p><strong>2. Purpose of Collection:</strong> Used to track employment status, recommend opportunities, and improve services.</p>
          <p><strong>3. Data Sharing and Access:</strong> Only shared with authorized personnel. We do not sell your info.</p>
          <p><strong>4. Data Security:</strong> Your data is securely stored. You may update or request deletion anytime.</p>
          <p><strong>5. Your Rights:</strong> You can access, correct, or delete your data and withdraw consent at any time.</p>
          <p className="text-sm text-gray-600">For concerns, contact: <a href="mailto:ccdmnofficealumnilink@umindanao.edu.ph" className="text-blue-600 underline">ccdmnofficealumnilink@umindanao.edu.ph</a></p>
        </div>
        <div className="mt-6 flex items-center justify-end">
          <button
            onClick={onAgree}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataPrivacyModal;
